import React from "react";
import classNames from "classnames";

import styles from "../style.module.scss";
import Spinner from "@/_components/Spinner";
import { Icon } from "@/_components/Icon";
import { CTAButtonProps } from "@/_components/CTA/types";

export const SecondaryButton = (props: CTAButtonProps) => {
  const { iconPosition, loading, ...htmlProps } = props;
  return (
    <button
      {...htmlProps}
      disabled={loading || htmlProps.disabled}
      className={classNames(
        styles.secondary,
        props.className,
        iconPosition === "left" ? styles.reverse : "",
      )}
    >
      <span>{props.children}</span>
      <span className={styles.icon}>
        {loading ? (
          <Spinner />
        ) : (
          <Icon name="arrow-top" width={18} height={18} />
        )}
      </span>
    </button>
  );
};
