import {
  Dates,
  Master,
  Masters,
  Services as AltegioServices,
  Times,
  Visit,
} from "@/app-types";

export interface ScheduleFormData {
  name: string;
  email: string;
  phone: string;
  text: string;
}

export interface SubmitScheduleProps {
  isValid: boolean;
  values: ScheduleFormData;
}

export interface ServiceWithCategoryTitle {
  title: string;
  services: AltegioServices;
}

export type ServicesWithCategoryTitle = Array<ServiceWithCategoryTitle>;

type SelectedValues = {
  flow?: "master" | "service" | undefined;
  location?: string;
  master?: Master;
  services: AltegioServices;
  categories: Array<number>;
  date: string;
  time: string;
};

export interface ScheduleState {
  loading: boolean;
  repeatLoading: boolean;
  error?: string;
  currentStep: number;
  masters: Masters;
  services: ServicesWithCategoryTitle;
  dates?: Dates;
  times: Times;
  formData: {
    isValid: boolean;
    name: string;
    email: string;
    phone: string;
    text: string;
  };
  isReschedule?: boolean;
  visit?: Visit;
  selected: SelectedValues;
}

type FormData = {
  name: string;
  phone: string;
  email?: string;
  text?: string;
};

export interface ScheduleActions {
  setLoading: (loading: boolean) => void;
  onRedirectToMaster: (location: string, master: string) => void;
  next: () => void;
  prev: () => void;
  updateFormData: (newState: Partial<ScheduleStoreProps["formData"]>) => void;
  getMasters: (next?: boolean) => void;
  getServices: (updateServices?: boolean) => void;
  getDates: (next?: boolean) => void;
  getTimes: (date?: Date) => void;
  getCategories: () => void;
  resetStore: () => void;
  submit: (formData: FormData) => void;
  onRepeat: (visit: Visit) => void;
  onReschedule: (visit: Visit) => void;
  reschedule: (onSuccess: () => void) => void;
  updateSelected: (
    values: Partial<ScheduleState["selected"]>,
    goNext?: boolean,
  ) => void;
}

export interface ScheduleStoreProps extends ScheduleState {
  actions: ScheduleActions;
}
