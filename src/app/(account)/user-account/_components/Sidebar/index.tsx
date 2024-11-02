"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.scss";
import Typography from "@/_components/Typography";
import { Account } from "@/payload-types";
import classNames from "classnames";
import { useSignInStore } from "@/stores/sign-in";
import { Icon } from "@/_components/Icon";

const icons = {
  "/user-account/schedule": "edit",
  "/user-account/visits": "calendar",
  "/user-account/subscription": "membership",
  "/user-account/certificates": "certificates",
  "/user-account/loyalty": "loyalty",
  "/user-account/logout": "arrow-short",
};

const Sidebar = ({ account }: { account: Account }) => {
  const pathname = usePathname();
  const logout = useSignInStore((state) => state.logout);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    logout();
  };

  if (pathname === "/user-account") {
    return <></>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <h4>{account.sidebar?.title}</h4>

        <nav>
          {account.sidebar?.links?.map((link) => {
            //@ts-ignore
            const iconName = icons[link.url];
            return (
              <Link
                prefetch={true}
                key={link.id}
                href={link.url}
                className={classNames(
                  styles.link,
                  pathname.includes(link.url) ? styles.active : "",
                )}
                {...(link.url === "/user-account/logout" ? { onClick } : {})}
              >
                {iconName && <Icon name={iconName} height={16} width={16} />}
                <Typography size={3}>{link.label}</Typography>
                <Icon name="check" width={24} height={24} />
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
