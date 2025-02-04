export interface Vehicle {
  asset_id: string;
  tracker_id: string;
  plate: string;
  car_model: string;
  driver_id: string;
  driver_name: string;
  in_maintenance: boolean;
  label_property: string;
  tracker_feature_device_id: string;
  custom_label: string;
}

export interface Question {
  id: string;
  question: string;
  has_observation: boolean;
  right_answer: string;
}

export interface ChecklistConfig {
  id: string;
  name: string;
}

export interface Checklist {
  id: string;
  name: string;
  question: Question[];
  checklist_config: ChecklistConfig;
  assets: string[];
}

interface Tenant {
  company_name: string;
  name: string;
}

interface Driver {
  config: object;
  name: string;
}

interface Client {
  company_name: string;
  name: string;
}

export interface DecodedToken {
  client: Client;
  client_id: string;
  driver: Driver;
  driver_id: string;
  email: string;
  exp: number;
  iat: number;
  tenant: Tenant;
  tenant_id: string;
}
