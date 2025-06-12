import { routing } from "@/i18n/routing";

// Define interfaces for PCO data structure
export interface PcoScheduleItem {
  attributes: {
    sort_date: string;
    team_position_name: string;
    service_type_name: string;
    responds_to_name: string;
  };
  relationships: {
    responds_to_person: {
      data: {
        id: string;
      };
    };
  };
}

export interface PcoAvailableSignup {
  attributes: {
    sort_date: string;
    position_name: string;
    responds_to_name: string;
  };
  links: {
    self: string;
  };
  // relationships?: {
  //   responds_to_person: {
  //     data: {
  //       id: string;
  //     };
  //   };
  // };
}

export interface PcoData {
  schedule: {
    data?: PcoScheduleItem[];
  };
  availableSignups: {
    included?: PcoAvailableSignup[];
    errors?: Array<{
      id: string;
      title: string;
      detail: string;
      code: string;
      status: string;
    }>;
  };
}

// 🔹 1. Grouping logic
export interface ScheduleItem {
  position: string;
  serviceType?: string;
  sortDate: string;
  type: "scheduled" | "available";
  acceptLink?: string;
  respondsTo?: {
    name: string;
    pcoId: string;
  };
}

export type Team = {
  position: string;
  type: "available" | "scheduled";
  acceptLink?: string;
  sortDate?: string;
  respondsTo?: {
    pcoId: string;
    name: string;
  };
};

export type RespondsToUser = {
  avatar: string;
  email: string;
  phoneNumber: string;
  cleanPhoneNumber: string;
} | null;

export interface PCOIncludedItem {
  type: string;
  attributes: {
    primary?: boolean;
    address?: string;
    international?: string;
  };
}

export type AppPath = keyof typeof routing.pathnames;

export interface MenuItem {
  name: string;
  href: AppPath;
}
