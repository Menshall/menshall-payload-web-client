import React from "react";
import styles from "./styles.module.scss";
import { Metadata } from "next";
import VisitsComponent from "@/app/(account)/user-account/(details)/visits/Visits";

export const metadata: Metadata = {
  title: "Мої Візити",
};

export default async function Page() {
  return (
    <div className={styles.visits}>
      <h2>Мої Візити</h2>
      <div className={styles.scroll}>
        <VisitsComponent />
      </div>
    </div>
  );
}
