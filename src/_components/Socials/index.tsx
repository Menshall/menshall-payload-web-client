"use client";

import * as React from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";
import Social from "@/_components/Socials/Social";
import { useGeneralData } from "@/providers/general";

const Socials = ({ className }: { className?: string }) => {
  const { socials } = useGeneralData();

  return (
    <div className={classNames(styles.secondary, className)}>
      {socials.socials?.map((social) => {
        return (
          <Social key={social.id} name={social.name} newLink={social.newLink} />
        );
      })}
    </div>
  );
};

export default Socials;
