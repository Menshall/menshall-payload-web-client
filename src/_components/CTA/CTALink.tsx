import React from "react";
import Link from "next/link";
import { CTALinkPropsGeneral } from "@/_components/CTA/types";
import { PrimaryLink } from "@/_components/CTA/Links/PrimaryLink";
import { SecondaryLink } from "@/_components/CTA/Links/SecondaryLink";
import styles from "./style.module.scss";
import classNames from "classnames";

const CTALink = (props: CTALinkPropsGeneral) => {
  const { link, className, children = "", iconPosition = "right" } = props;

  const reverse = iconPosition === "left" ? styles.reverse : "";

  const href =
    link?.type === "page" ? `/${link?.pageUrl}` : (link?.customUrl as string);

  if (href) {
    const newTabProps = link?.newTab
      ? { target: "_blank", rel: "noopener noreferrer" }
      : { target: "", rel: "" };

    if (link?.variant === "primary") {
      return (
        <PrimaryLink
          href={href}
          target={newTabProps.target}
          rel={newTabProps.rel}
          className={classNames(className, reverse)}
        >
          {children || props.link?.label}
        </PrimaryLink>
      );
    }

    if (link?.variant === "secondary") {
      return (
        <SecondaryLink
          href={href}
          target={newTabProps.target}
          rel={newTabProps.rel}
          className={classNames(className, reverse)}
        >
          {children || props.link?.label}
        </SecondaryLink>
      );
    }

    return (
      <Link href={href} className={classNames(className, reverse)}>
        {children || props.link?.label}
      </Link>
    );
  }

  return "No Href";
};

export default CTALink;
