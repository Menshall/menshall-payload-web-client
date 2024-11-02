import React from "react";
import { Loyalty } from "@/app-types";
import styles from "./styles.module.scss";
import { Metadata } from "next";
import { getToken } from "@/lib/cookies";
import { fetchLocalEndpoint } from "@/fetch";
import LoyaltyCard from "@/app/(account)/user-account/_components/LoyaltyCard";
import Typography from "@/_components/Typography";
// import { PrimaryButton } from "@/_components/CTA/Buttons/PrimaryButton";
// import { TertiaryButton } from "@/_components/CTA/Buttons/TertiaryButton";

export const metadata: Metadata = {
  title: "Карти Лояльності",
};
export default async function Page() {
  const token = await getToken();
  let loyalties: Array<Loyalty> = [];
  if (token) {
    await fetchLocalEndpoint({
      url: `loyalty`,
      body: {
        token,
        group: "126001",
        location: "146074",
      },
      onSuccess: (response) => {
        loyalties = response.loyalties;
      },
    });
  }

  return (
    <div className={styles.loyaltyPage}>
      <h2>Карти Лояльності</h2>
      {loyalties.length > 0 ? (
        <div className={styles.loyalties}>
          {loyalties.map((l) => (
            <LoyaltyCard loyalty={l} key={l.id} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <Typography size={3}>
            У вас ще немає карток постійного клієнта
          </Typography>
          {/*<div className={styles.actions}>*/}
          {/*  <PrimaryButton>Придбати картку</PrimaryButton>*/}
          {/*  <TertiaryButton>Дізнатись Більше</TertiaryButton>*/}
          {/*</div>*/}
        </div>
      )}
    </div>
  );
}
