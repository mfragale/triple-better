"use client";

import React, { useState } from "react";

import {
  Calendar,
  Check,
  CheckCircle,
  ChevronsUpDown,
  Clock,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

import { acceptSchedule } from "@/actions/planning-center/accept-schedule";
import LoadingButton from "@/components/loading-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Team } from "@/types";

import { TeamMemberCard } from "./team-member-card";

interface TeamScheduleCardProps {
  date: Date;
  times: Record<string, Team[]>;
  pcoAccessToken: string;
}

export function TeamScheduleCard({
  date,
  times,
  pcoAccessToken,
}: TeamScheduleCardProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const t = useTranslations("pcoSchedule");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const handleTimeChange = (e: string) => {
    setSelectedTime(e);
    setSelectedTeam("");
  };

  // const handleTeamChange = (e: string) => {
  //   setSelectedTeam(e);
  // };

  // Extract time keys with only available slots
  const availableTimeOptions = Object.entries(times).filter(
    ([, teams]) => !teams.some((team) => team.type === "scheduled")
  );

  // Extract scheduled teams for display immediately (before any interaction)
  const scheduledTeams = Object.entries(times).flatMap(([time, teams]) =>
    teams
      .filter((team) => team.type === "scheduled")
      .map((team) => ({
        ...team,
        time,
      }))
  );

  const teams = selectedTime ? times[selectedTime] : [];
  const availableTeams = teams
    .filter((team) => team.type === "available")
    .sort((a, b) => a.position.localeCompare(b.position));

  const selectedTeamObj = availableTeams.find(
    (team) => team.position === selectedTeam
  );
  const acceptLink = selectedTeamObj?.acceptLink ?? "";

  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState("");

  return (
    <Card
      className={`mb-6 w-full ${
        scheduledTeams.length > 0 ? "bg-accent/30 border-emerald-400/20" : ""
      }`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-zinc-700 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-zinc-200" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-accent-foreground">
                {new Intl.DateTimeFormat(useLocale(), {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  timeZone: "UTC",
                }).format(date)}
              </h3>
              <p className="text-muted-foreground capitalize">
                {new Intl.DateTimeFormat(useLocale(), {
                  weekday: "long",
                  timeZone: "UTC",
                }).format(date)}
              </p>
            </div>
          </div>
          {scheduledTeams.length > 0 && (
            <Badge variant="success_outline">
              <CheckCircle className="mr-1 w-4 h-4" />
              {t("alreadyScheduled")}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardFooter className="-mb-6 px-0">
        {/* ALREADY SCHEDULED */}
        {scheduledTeams.length > 0 && (
          <div className="bg-emerald-500/10 p-6 border-emerald-500/20 border-t w-full">
            <div className="flex flex-col justify-center gap-2 min-h-[36px]">
              {scheduledTeams.map((team, index) => (
                <div
                  className="flex justify-between items-center gap-2"
                  key={index}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-500">
                      <span className="font-medium">{team.time}</span>
                      {" - "}
                      {team.position}
                    </span>
                  </div>
                  <TeamMemberCard team={team} pcoAccessToken={pcoAccessToken} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCHEDULE STILL AVAILABLE */}
        {availableTimeOptions.length > 0 && (
          <div className="flex sm:flex-row flex-col gap-4 p-6 border-t w-full">
            {/* SELECT TIME */}
            <Select onValueChange={handleTimeChange}>
              <SelectTrigger className="w-auto grow">
                <SelectValue placeholder={t("selectTime")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("times")}</SelectLabel>

                  {availableTimeOptions.map(([time]) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* SELECT TEAM */}
            {/* <Select onValueChange={handleTeamChange} disabled={!selectedTime}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("selectTeam")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("teams")}</SelectLabel>

                  {availableTeams.map((team, index) => (
                    <SelectItem key={index} value={team.position}>
                      {team.position}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select> */}

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="justify-between w-auto grow"
                  disabled={!selectedTime}>
                  {selectedTeam
                    ? availableTeams.find(
                        (team) => team.position === selectedTeam
                      )?.position
                    : t("selectTeam")}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 min-w-[300px]">
                <Command>
                  <CommandInput placeholder={t("teams")} className="h-9" />
                  <CommandList>
                    <CommandEmpty>{t("noTeamFound")}</CommandEmpty>
                    <CommandGroup>
                      {availableTeams.map((team) => (
                        <CommandItem
                          key={team.position}
                          value={team.position}
                          onSelect={(currentValue) => {
                            // setValue(
                            //   currentValue === value ? "" : currentValue
                            // );
                            setSelectedTeam(currentValue);
                            setOpen(false);
                          }}>
                          {team.position}
                          <Check
                            className={cn(
                              "ml-auto",
                              selectedTeam === team.position
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* CONFIRM BUTTON */}
            <LoadingButton
              size="sm"
              disabled={isPending || !selectedTime || !selectedTeam}
              pending={isPending}
              onClick={async () => {
                setIsPending(true);
                const result = await acceptSchedule(acceptLink, pcoAccessToken);
                if (result.success) {
                  toast.success(t("scheduleConfirmed"));
                  router.refresh();
                } else {
                  toast.error(t("errorConfirmingSchedule"));
                  router.refresh();
                }
                setIsPending(false);
              }}>
              {t("confirmSchedule")}
            </LoadingButton>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
