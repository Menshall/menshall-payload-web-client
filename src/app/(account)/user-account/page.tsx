import React from "react";

import styles from "./styles.module.scss";
import AccountCard from "./_components/AccountCard";
import { Metadata } from "next";
import { getAccount } from "@/lib/enpoints";
import { TertiaryButton } from "@/_components/CTA/Buttons/TertiaryButton";
import LogoutButton from "@/app/(account)/user-account/_components/LogoutButton";

export const metadata: Metadata = {
  title: "Мій Акаунт",
};

export default async function Page() {
  const account = await getAccount();

  return (
    <>
      <div className={styles.accountCards}>
        {account.sidebar?.links?.map((link) => (
          <AccountCard link={link} key={link.id} />
        ))}
      </div>
      <LogoutButton />
    </>
  );
}
