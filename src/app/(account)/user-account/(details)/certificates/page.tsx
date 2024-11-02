import React from "react";
import { Metadata } from "next";
import styles from "@/app/(account)/user-account/(details)/loyalty/styles.module.scss";
import Typography from "@/_components/Typography";

export const metadata: Metadata = {
  title: "Сертифікати",
};
export default async function Page() {
  return (
    <div className={styles.loyaltyPage}>
      <h2>Сертифікати</h2>
      <div className={styles.empty}>
        <Typography size={3}>У вас ще немає сертифікатів</Typography>
      </div>
    </div>
  );
}
