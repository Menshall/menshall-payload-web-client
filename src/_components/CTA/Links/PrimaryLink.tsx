"use client";

import Link from "next/link";
import styles from "@/_components/CTA/style.module.scss";
import { Icon } from "@/_components/Icon";
import React from "react";
import { CTALinkProps } from "../types";
import classNames from "classnames";

export const PrimaryLink = (props: CTALinkProps) => {
  const ref = React.useRef<HTMLAnchorElement | null>(null);

  const [dash, setDash] = React.useState(0);

  React.useEffect(() => {
    if (ref.current !== null) {
      const { width, height } = ref.current.getBoundingClientRect();
      setDash(width * 2 + height * 2);
    }
  }, [ref, ref.current]);

  return (
    <Link
      ref={ref}
      href={props.href}
      target={props.target}
      rel={props.rel}
      className={classNames(styles.primary, props.className)}
      prefetch={true}
      // disabled={loading || htmlProps.disabled}
    >
      <svg
        width="200"
        height="50"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.border}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className={styles.stop} />
            <stop offset="100%" className={styles.stop2} />
          </linearGradient>
        </defs>
        {dash > 0 && (
          <rect
            width="100%"
            height="100%"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeDasharray={dash}
            strokeDashoffset={dash}
          />
        )}
      </svg>
      <span>{props.children}</span>
      <span className={styles.icon}>
        <Icon
          name="arrow-top"
          width={18}
          height={18}
          color="var(--primary-dark)"
        />
      </span>
    </Link>
  );
};
