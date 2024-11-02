import React from "react";
import ScheduleComponent from "@/_components/Schedule";
import styles from "./styles.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Запис на сеанс",
};

export default async function Page() {
  return (
    <div className={styles.scroll}>
      <ScheduleComponent />
    </div>
  );
}
