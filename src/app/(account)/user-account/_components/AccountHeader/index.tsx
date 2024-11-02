"use client";

import React from "react";
import styles from "./styles.module.scss";
import { Account } from "@/payload-types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AccountUser } from "@/app-types";
import classNames from "classnames";
import AccountScheduleStepCounter from "@/app/(account)/user-account/_components/AccountScheduleStepCounter";

const AccountHeader = ({
  account,
  user,
}: {
  account: Account;
  user: AccountUser;
}) => {
  const pathname = usePathname();

  const link = account.sidebar!.links!.find((l) => l.url === pathname);

  return (
    <article className={classNames(styles.accountTitle, "grid-content")}>
      <div className={styles.links}>
        <Link prefetch={true} href="/user-account">
          Головна
        </Link>
        {link && link.url !== "/user-account" && (
          <>
            /{" "}
            <Link prefetch={true} href={link.url}>
              {link.label}
            </Link>
          </>
        )}
        {pathname === "/user-account/visits/repeat" && (
          <>
            /
            <Link prefetch={true} href="/user-account/visits">
              Мої візити
            </Link>
            /
            <Link prefetch={true} href="/user-account/visits/repeat">
              Повторити запис
            </Link>
          </>
        )}
        {pathname === "/user-account/visits/reschedule" && (
          <>
            /
            <Link prefetch={true} href="/user-account/visits">
              Мої візити
            </Link>
            /
            <Link prefetch={true} href="/user-account/visits/reschedule">
              Змінити запис
            </Link>
          </>
        )}
      </div>
      {/\b(schedule|repeat|reschedule)\b/.test(pathname) && (
        <AccountScheduleStepCounter />
      )}
    </article>
  );
};

export default AccountHeader;
