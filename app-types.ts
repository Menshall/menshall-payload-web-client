import { Barbers as PayloadBarbers } from "@/payload-types";

export interface Props {
  url: string;
  onSuccess: (response: any) => void;
  body: any;
}

export type AccountUser = {
  name?: string;
  token?: string;
  avatar?: string;
};

export interface Category {
  id: number;
  category_id: number;
  salon_service_id: number;
  title: string;
  weight: number;
  api_id: string;
  staff: number[];
  booking_title: string;
  price_min: number;
  price_max: number;
  sex: number;
  is_chain: boolean;
}

export type Categories = Category[];
export interface Time {
  time: string;
  seance_length: number;
  sum_length: number;
  datetime: string;
}
export type Times = Time[];
export type Dates = string[];

export interface Master {
  id: number;
  api_id?: any;
  name: string;
  specialization: string;
  rating: number;
  show_rating: number;
  user_id?: any;
  avatar: string;
  avatar_big: string;
  comments_count: number;
  votes_count: number;
  bookable: boolean;
  image_group: ImageGroup;
  information: string;
  position_id: number;
  schedule_till: string;
  weight: number;
  fired: number;
  status: number;
  hidden: number;
  user?: any;
  prepaid: string;
  position: Position;
}

export type Masters = Master[];

interface Position {
  id: number;
  title: string;
}
interface ImageGroup {
  id: number;
  entity: string;
  entity_id: string;
  images: Images;
}
interface Images {
  sm: Sm;
  norm: Sm;
  origin: Sm;
}
interface Sm {
  id: number;
  path: string;
  width: string;
  height: string;
  type: string;
  image_group_id: number;
  version: string;
}

export interface Service {
  id: number;
  title: string;
  category_id: number;
  price_min: number;
  price_max: number;
  discount: number;
  comment: string;
  weight: number;
  active: number;
  sex: number;
  image: string;
  prepaid: string;
  seance_length: number;
  abonement_restriction: number;
  prepaid_settings: PrepaidSettings;
}
interface PrepaidSettings {
  status: string;
  prepaid_full: PrepaidFull;
  prepaid_min: PrepaidMin;
}
interface PrepaidMin {
  amount: number;
  percent: number;
  currency: string;
}
interface PrepaidFull {
  amount: number;
  currency: string;
}

export type Services = Service[];

export interface Barbers {
  [key: string]: PayloadBarbers["barbers"];
}

export interface Company {
  id: number;
  title: string;
  public_title: string;
  business_group_id: number;
  business_type_id: number;
  country_id: number;
  city_id: number;
  timezone: number;
  timezone_name: string;
  address: string;
  coordinate_lat: number;
  coordinate_lon: number;
  logo: string;
  zip: string;
  phone: string;
  phones: string[];
  site: string;
  allow_delete_record: boolean;
  allow_change_record: boolean;
}

export interface Barber {
  id: number;
  name: string;
  company_id: number;
  specialization: string;
  information: string;
  api_id?: any;
  fired: number;
  is_fired: boolean;
  dismissal_date?: any;
  dismissal_reason?: any;
  hidden: number;
  is_online: boolean;
  status: number;
  is_deleted: boolean;
  user_id: number;
  rating: number;
  prepaid: string;
  is_chain: boolean;
  weight: number;
  is_rating_shown: boolean;
  is_online_random_choice_allowed: boolean;
  seance_step: number;
  seance_search_step: number;
  seance_search_start: number;
  seance_search_finish: number;
  avatar: string;
  avatar_big: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  phone: string;
  avatar: string;
  email: string;
}

///

export interface Visit {
  id: number;
  clients_count: number;
  date: string;
  datetime: string;
  create_date: string;
  comment: string;
  deleted: boolean;
  attendance: number;
  length: number;
  notify_by_sms: number;
  notify_by_email: number;
  master_requested: boolean;
  online: boolean;
  api_id: string;
  last_change_date: string;
  prepaid: boolean;
  prepaid_confirmed: boolean;
  activity_id: number;
  paid_amount: number;
  allow_delete_record: boolean;
  allow_change_record: boolean;
  is_confirmation_needed: boolean;
  review_enabled: boolean;
  token: string;
  company: VisitCompany;
  resource_instances: any[];
  charge: any[];
  staff: Staff;
  services: VisitService[];
}
interface VisitService {
  id: number;
  title: string;
  cost: number;
  price_min: number;
  price_max: number;
  discount: number;
  amount: number;
  seance_length: number;
  api_id: string;
  abonement_restriction: number;
}

interface Staff {
  id: number;
  name: string;
  specialization: string;
  show_rating: number;
  rating: number;
  votes_count: number;
  avatar: string;
  avatar_big: string;
  comments_count: number;
  is_deleted: boolean;
  position: Position;
}
interface Position {
  id: number;
  chain_id: number;
  title: string;
  description: string;
  services_binding_type: number;
  rules_required_fields: any[];
  only_chain_appointment: boolean;
}
interface VisitCompany {
  id: number;
  title: string;
  public_title: string;
  country_id: number;
  country: string;
  city_id: number;
  city: string;
  phone: string;
  phones: string[];
  timezone: number;
  address: string;
  coordinate_lat: number;
  coordinate_lon: number;
  allow_delete_record: boolean;
  allow_change_record: boolean;
  allow_change_prepaid_record: boolean;
  allow_delete_prepaid_record: boolean;
  site: string;
  currency_short_title: string;
  allow_change_record_delay_step: number;
  allow_delete_record_delay_step: number;
  logo: string;
}

export interface Loyalty {
  id: number;
  balance: number;
  points: number;
  paid_amount: number;
  sold_amount: number;
  visits_count: number;
  number: string;
  type_id: number;
  salon_group_id: number;
  max_discount_percent: number;
  max_discount_amount: number;
  type: Type;
  salon_group: Salongroup;
  applicable_items: any[];
  programs: Program[];
}
interface Program {
  id: number;
  title: string;
  type: string;
  loyalty_type_id: number;
  item_type_id: number;
  service_item_type: string;
  good_item_type: string;
  value_unit_id: number;
  value_unit: string;
  group_id: number;
  usage_limit: number;
  visit_multiplicity: number;
  sold_items_multiplicity: number;
  current_package_progress: number;
  allowed_usages_amount: number;
  expiration_timeout: number;
  expiration_timeout_unit?: any;
  expiration_notification_timeout: number;
  params_source_type: string;
  history_start_date?: any;
  on_changed_notification_template_id: number;
  on_expiration_notification_template_id: number;
  value: number;
  loyalty_type: Loyaltytype;
  applicable_items: any[];
  rules: Rule[];
}
interface Rule {
  id: number;
  loyalty_program_id: number;
  loyalty_type_id: number;
  value: number;
  parameter: number;
  service_id?: any;
  service?: any;
}
interface Loyaltytype {
  id: number;
  slug: string;
  title: string;
  is_discount: boolean;
  is_cashback: boolean;
  is_static: boolean;
  is_accumulative: boolean;
  is_visit_limited: boolean;
}
interface Salongroup {
  id: number;
  title: string;
}
interface Type {
  id: number;
  title: string;
  salon_group_id: number;
  service_item_type: string;
  good_item_type: string;
}
