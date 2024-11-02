import React from "react";
import styles from "./styles.module.scss";
import Sidebar from "@/app/(account)/user-account/_components/Sidebar";
import { getAccount } from "@/lib/enpoints";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const account = await getAccount();
  return (
    <div className={styles.inner}>
      <Sidebar account={account} />
      {children}
    </div>
  );
}
