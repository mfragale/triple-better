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

export interface PagarmeCustomerPhone {
  home_phone?: {
    country_code: string;
    number: string;
    area_code: string;
  };
  mobile_phone?: {
    country_code: string;
    number: string;
    area_code: string;
  };
}

export interface PagarmeCustomerAddress {
  line_1: string;
  line_2?: string;
  zip_code: string;
  city: string;
  state: string;
  country: string;
}

export interface PagarmeCustomer {
  id: string;
  name: string;
  email: string;
  phones?: PagarmeCustomerPhone;
  document: string;
  document_type: "PASSPORT" | "CPF" | "CNPJ";
  type: "individual" | "company";
  gender?: "male" | "female";
  address?: PagarmeCustomerAddress;
  fb_id?: number;
  fb_access_token?: string;
  delinquent: boolean;
  code?: string;
  created_at: string;
  updated_at: string;
  birthdate?: string;
  metadata?: Record<string, unknown>;
}

export interface PagarmePaymentLink {
  id: string;
  url: string;
  status: string;
  name: string;
  type: string;
  total_sessions: number;
  max_paid_sessions: number;
  total_paid_sessions: number;
  max_sessions: number;
  expires_in: number;
  created_at: string;
  updated_at: string;
  payment_settings: {
    accepted_payment_methods: string[];
    credit_card_settings: {
      operation_type: string;
      installments: Array<{
        number: number;
        total: number;
      }>;
    };
  };
  cart_settings: {
    items: Array<{
      amount: number;
      name: string;
      default_quantity: number;
    }>;
    items_total_cost: number;
    total_cost: number;
    shipping_cost: number;
    shipping_total_cost: number;
  };
}
