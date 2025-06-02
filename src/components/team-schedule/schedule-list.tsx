import { useLocale, useTranslations } from "next-intl";

import {
  PcoAvailableSignup,
  PcoData,
  PcoScheduleItem,
  ScheduleItem,
} from "@/types";

import { TeamScheduleCard } from "./team-schedule-card";

function groupSignupsByDateAndTime(data: PcoData) {
  const grouped: Record<string, Record<string, ScheduleItem[]>> = {};
  const scheduledDates = new Set<string>();
  const dateToSortDate: Record<string, Date> = {};

  // First process scheduled items and track which dates have scheduled items
  data.schedule.data?.forEach((item: PcoScheduleItem) => {
    const date = new Date(item.attributes.sort_date);
    const dateString = new Intl.DateTimeFormat(useLocale(), {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      weekday: "short",
      timeZone: "UTC",
    }).format(new Date(date));
    const timeString = new Intl.DateTimeFormat(useLocale(), {
      timeStyle: "short",
      timeZone: "UTC",
    }).format(new Date(date));

    scheduledDates.add(dateString);
    dateToSortDate[dateString] = date;

    if (!grouped[dateString]) {
      grouped[dateString] = {};
    }

    if (!grouped[dateString][timeString]) {
      grouped[dateString][timeString] = [];
    }

    grouped[dateString][timeString].push({
      position: item.attributes.team_position_name,
      serviceType: item.attributes.service_type_name,
      sortDate: date.toISOString(),
      type: "scheduled",
      respondsTo: {
        name: item.attributes.responds_to_name,
        pcoId: item.relationships.responds_to_person.data.id,
      },
    });
  });

  // Then process available signups, but only for dates that don't have any scheduled items
  data.availableSignups.included?.forEach((signup: PcoAvailableSignup) => {
    const { sort_date, position_name } = signup.attributes;
    const date = new Date(sort_date);
    const dateString = new Intl.DateTimeFormat(useLocale(), {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      weekday: "short",
      timeZone: "UTC",
    }).format(new Date(date));
    const timeString = new Intl.DateTimeFormat(useLocale(), {
      timeStyle: "short",
      timeZone: "UTC",
    }).format(new Date(date));

    // Only add available signups if there are no scheduled items for this date
    if (!scheduledDates.has(dateString)) {
      if (!grouped[dateString]) {
        grouped[dateString] = {};
      }

      if (!grouped[dateString][timeString]) {
        grouped[dateString][timeString] = [];
      }

      dateToSortDate[dateString] = date;

      grouped[dateString][timeString].push({
        position: position_name,
        acceptLink: signup.links.self,
        sortDate: date.toISOString(),
        type: "available",
      });
    }
  });

  // Sort times within each date
  Object.keys(grouped).forEach((date) => {
    grouped[date] = Object.keys(grouped[date])
      .sort(
        (a, b) =>
          new Date(`1970-01-01T${a}`).getTime() -
          new Date(`1970-01-01T${b}`).getTime()
      )
      .reduce(
        (acc, time) => {
          acc[time] = grouped[date][time];
          return acc;
        },
        {} as Record<string, ScheduleItem[]>
      );
  });

  // Sort dates chronologically
  const sortedDates = Object.keys(grouped).sort((a, b) => {
    return dateToSortDate[a].getTime() - dateToSortDate[b].getTime();
  });

  // Create a new object with sorted dates and include the full date object
  const sortedGrouped: Record<
    string,
    { date: Date; times: Record<string, ScheduleItem[]> }
  > = {};
  sortedDates.forEach((date) => {
    sortedGrouped[date] = {
      date: dateToSortDate[date],
      times: grouped[date],
    };
  });

  return sortedGrouped;
}

interface ScheduleListProps {
  availableSignups: PcoData["availableSignups"];
  schedule: PcoData["schedule"];
  pcoAccessToken: string;
}

export function ScheduleList({
  availableSignups,
  schedule,
  pcoAccessToken,
}: ScheduleListProps) {
  const t = useTranslations("pcoSchedule");
  const groupedSignups = groupSignupsByDateAndTime({
    availableSignups,
    schedule,
  });

  if (Object.keys(groupedSignups).length === 0) {
    return <p>{t("noSchedule")}</p>;
  }

  return (
    <>
      {Object.entries(groupedSignups).map(([dateString, { date, times }]) => (
        <TeamScheduleCard
          key={dateString}
          date={date}
          times={times}
          pcoAccessToken={pcoAccessToken}
        />
      ))}
    </>
  );
}
