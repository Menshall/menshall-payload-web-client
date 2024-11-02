"use client";

import React from "react";
import { useSignInStore } from "@/stores/sign-in";
import { TertiaryButton } from "@/_components/CTA/Buttons/TertiaryButton";
import styles from "./styles.module.scss";

const LogoutButton = () => {
  const logout = useSignInStore((state) => state.logout);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    logout();
  };

  return (
    <div className={styles.button}>
      <TertiaryButton onClick={onClick} className={styles.button}>
        Вийти
      </TertiaryButton>
    </div>
  );
};

export default LogoutButton;
