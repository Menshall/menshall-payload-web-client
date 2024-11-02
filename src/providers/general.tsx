"use client";

import React, { createContext, useContext } from "react";
import {
  Barbers,
  Contact,
  Footer,
  Header,
  Schedule,
  Service,
  Settings,
  Social,
} from "@/payload-types";
import { AccountUser } from "@/app-types";

export type Data = {
  header: Header;
  contacts: Contact;
  settings: Settings;
  services: Service;
  user: AccountUser | null;
  footer: Footer;
  socials: Social;
  barbers: Barbers;
  schedule: Schedule;
  media: Array<{
    _id: string;
    _key: string;
    filename: string;
    height: number;
    width: number;
  }>;
  barbersFormatted: {
    //@ts-ignore
    [key: string]: Barbers["barbers"][0];
  };
};

const GeneralDataContext = createContext<Data>({} as Data);

export const GeneralDataProvider = ({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: Data;
}) => {
  let barbersFormatted = {} as Data["barbersFormatted"];

  if (initialData.barbers.barbers) {
    barbersFormatted = initialData.barbers.barbers.reduce(
      (acc, curr) => {
        return {
          ...acc,
          //@ts-ignore
          [curr.id]: curr,
        };
      },
      {} as Data["barbersFormatted"],
    );
  }

  return (
    <GeneralDataContext.Provider value={{ ...initialData, barbersFormatted }}>
      {children}
    </GeneralDataContext.Provider>
  );
};

export const useGeneralData = () => useContext(GeneralDataContext);
