import React from "react";
import { Account } from "@/payload-types";
import Link from "next/link";
import styles from "./styles.module.scss";
import Typography from "@/_components/Typography";
import { Icon } from "@/_components/Icon";

const icons = {
  "/user-account/visits": "calendar",
  "/user-account/subscription": "membership",
  "/user-account/certificates": "certificates",
  "/user-account/loyalty": "loyalty",
  "/user-account/settings": "settings",
  "/user-account/schedule": "settings",
};

const AccountCard = ({
  link,
}: {
  // @ts-ignore
  link: Account["sidebar"][0];
}) => {
  // @ts-ignore
  const iconName = icons[link.url];

  if (!iconName) {
    return <></>;
  }

  return (
    <Link prefetch={true} href={link.url} className={styles.card}>
      <Icon
        name={iconName}
        width={32}
        height={32}
        color="var(--primary-dark)"
      />
      <div className={styles.details}>
        <span className={styles.title}>
          <h5>{link.label}</h5>
          <Icon name="chevron" />
        </span>
        <Typography size={3}>{link.description}</Typography>
      </div>
    </Link>
  );
};

export default AccountCard;
