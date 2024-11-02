import { Service } from "@/app-types";

export const longDateFormat = (date?: Date) => {
  return new Intl.DateTimeFormat("UK", {
    year: "numeric",
    month: "numeric",
    day: "2-digit",
  })
    .format(date ? new Date(date) : new Date())
    .split(".")
    .reverse()
    .join("-");
};

export const convertServices = (services: Array<Service>) =>
  services.map((s) => `&service_ids%5B%5D=${s.id}`);

export const dayMonthFormatter = new Intl.DateTimeFormat("uk", {
  month: "long",
  day: "2-digit",
});

export const timeFormatter = new Intl.DateTimeFormat("uk", {
  hourCycle: "h24",
  hour: "numeric",
  minute: "2-digit",
});

export const timing = (seance_length: number) => {
  const time = seance_length / 60;

  const minutes = Math.ceil(((time / 60) % 1) * 60);
  const hours = Math.floor(time / 60);

  const outputHours = hours ? `${hours} г` : "";
  const outputMinutes = minutes ? ` ${minutes} хв` : "";

  return `${outputHours} ${outputMinutes}`;
};

export const getDay = (date: Date) => {
  return new Intl.DateTimeFormat("UK", {
    day: "2-digit",
  }).format(date);
};

export const getWeekDay = (date?: Date) => {
  return new Intl.DateTimeFormat("UK", {
    weekday: "short",
  }).format(date ? new Date(date) : new Date());
};
export const getMonth = (date: Date) => {
  return new Intl.DateTimeFormat("UK", {
    month: "long",
  }).format(date);
};

export const getHour = (date: Date) => {
  return new Intl.DateTimeFormat("UK", {
    hour: "numeric",
  }).format(date);
};

export const getMinutes = (date: Date) => {
  return new Intl.DateTimeFormat("UK", {
    minute: "numeric",
  }).format(date);
};
export const getHourMinutes = (date: Date) => {
  return new Intl.DateTimeFormat("UK", {
    hourCycle: "h24",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};

export const getDayMonthWeekday = (date: Date) => {
  return {
    day: getDay(date),
    weekday: getWeekDay(date),
    month: getMonth(date),
    hour: getHour(date),
    minutes: getMinutes(date),
    hourMinutes: getHourMinutes(date),
  };
};

export const phoneFormatter = (phone: string) => phone.replace(/[^\d]/g, "");
