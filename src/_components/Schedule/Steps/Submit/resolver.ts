import type { Resolver } from "react-hook-form";

import { ScheduleFormData } from "@/stores/schedule/types";

const emailRegex = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";

interface IError<T> {
  [key: string]: T;
}

function extractValidValues(inputString: string) {
  // Regular expression to match only numbers and the "+" character
  const pattern = /[0-9]+|\+/g;

  // Find all matches in the input string
  const matches = inputString.match(pattern);

  // Concatenate the matches into a single string
  const validValues = matches ? matches.join("") : "";
  return validValues.length;
}

export const resolver: Resolver<ScheduleFormData> = async (values) => {
  const errors = {} as IError<{ type: string; message: string }>;

  if (!values.name) {
    errors.name = {
      type: "required",
      message: "Введiть ім'я",
    };
  }

  if (!values.phone) {
    errors.phone = {
      type: "required",
      message: "Введiть телефон",
    };
  }

  if (values.email && !values.email.match(emailRegex)) {
    errors.email = {
      type: "invalid",
      message: "Некоректна пошта",
    };
  }

  if (
    (values.phone && !values.phone.includes("+38")) ||
    (values.phone && extractValidValues(values.phone) !== 13)
  ) {
    errors.phone = {
      type: "invalid",
      message: "Некоректний телефон",
    };
  }

  return {
    values,
    errors,
  };
};

export const phoneResolver: Resolver<{ phone: string }> = async (values) => {
  const errors = {} as IError<{ type: string; message: string }>;

  if (!values.phone) {
    errors.phone = {
      type: "required",
      message: "Введiть телефон",
    };
  }

  if (
    (values.phone && !values.phone.includes("+38")) ||
    (values.phone && extractValidValues(values.phone) !== 13)
  ) {
    errors.phone = {
      type: "invalid",
      message: "Некоректний телефон",
    };
  }

  return {
    values,
    errors,
  };
};
