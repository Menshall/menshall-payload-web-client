"use client";

import React from "react";
import styles from "./styles.module.scss";
import { Loyalty } from "@/app-types";
import Typography from "@/_components/Typography";
import CustomImage from "@/_components/CustomImage";
import { useGeneralData } from "@/providers/general";

const LoyaltyCard = ({ loyalty }: { loyalty: Loyalty }) => {
  const { settings } = useGeneralData();
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <CustomImage
          alt="alt"
          media={settings.logo as string}
          width="64"
          height="64"
        />
        <Typography className={styles.percentage} size={1}>
          {loyalty.max_discount_percent} %
        </Typography>
      </div>
      <div className={styles.cardBottom}>
        <Typography size={4}>{loyalty.number}</Typography>
        <Typography size={2}>{loyalty.type.title}</Typography>
      </div>
    </div>
  );
};

export default LoyaltyCard;
