"use client";

import React from "react";

import ContactInfo from "./ContactInfo";

import styles from "./styles.module.scss";
import { useGeneralData } from "@/providers/general";
import Section from "@/_components/Section";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../Map"), {
  ssr: false,
});

const Contacts = () => {
  const { contacts } = useGeneralData();
  return (
    <Section>
      <div className={styles.contacts}>
        <div className={styles.details}>
          <ContactInfo contacts={contacts} />
        </div>
        <div className={styles.mapContainer}>
          <div className={styles.map}>
            <MapComponent marker={contacts.general?.marker} />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contacts;
