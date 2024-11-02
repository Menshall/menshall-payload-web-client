"use client";

import React from "react";
import classNames from "classnames";

import styles from "../style.module.scss";
import Spinner from "@/_components/Spinner";
import { Icon } from "@/_components/Icon";
import { CTAButtonProps } from "@/_components/CTA/types";

export const PrimaryButton = (props: CTAButtonProps) => {
  const { iconPosition, loading, ...htmlProps } = props;
  const ref = React.useRef<HTMLButtonElement | null>(null);

  const [dash, setDash] = React.useState(0);

  React.useEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setDash(width * 2 + height * 2);
    }
  }, [ref, ref.current]);

  return (
    <button
      ref={ref}
      {...htmlProps}
      disabled={loading || htmlProps.disabled}
      className={classNames(
        styles.primary,
        props.className,
        iconPosition === "left" ? styles.reverse : "",
      )}
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
        {props.loading ? (
          <Spinner />
        ) : (
          <Icon
            name="arrow-top"
            width={18}
            height={18}
            color="var(--primary-dark)"
          />
        )}
      </span>
    </button>
  );
};
