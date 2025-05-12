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
};

const GeneralDataContext = createContext<Data>({} as Data);

export const GeneralDataProvider = ({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: Data;
}) => {
  return (
    <GeneralDataContext.Provider value={initialData}>
      {children}
    </GeneralDataContext.Provider>
  );
};

export const useGeneralData = () => useContext(GeneralDataContext);
