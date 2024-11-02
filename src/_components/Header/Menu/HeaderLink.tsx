"use client";

import React from "react";
import Typography from "@/_components/Typography";
import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";
import { Header } from "@/payload-types";
import classNames from "classnames";
import CTALink from "@/_components/CTA/CTALink";

const HeaderLink = ({
  link,
  size = 3,
}: {
  link: Header["newLink"];
  size?: 1 | 3;
}) => {
  const activeSlug = usePathname();

  const isActiveLink = (link: Header["newLink"]) => {
    const url = link?.type === "page" ? link.pageUrl : link?.customUrl;
    return `/${url}` === activeSlug;
  };

  const isBold = size === 1 ? "b-500" : "";

  return (
    <>
      <Typography
        size={size}
        className={classNames(
          isActiveLink(link) ? styles.active : styles.link,
          isBold,
        )}
      >
        <CTALink link={link} />
      </Typography>
    </>
  );
};

export default HeaderLink;
