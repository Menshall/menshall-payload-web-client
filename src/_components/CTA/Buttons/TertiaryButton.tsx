import React from "react";
import classNames from "classnames";

import styles from "../style.module.scss";
import { CTAButtonProps } from "@/_components/CTA/types";

export const TertiaryButton = (props: CTAButtonProps) => {
  const { iconPosition, loading, ...htmlProps } = props;

  return (
    <button
      {...htmlProps}
      className={classNames(styles.tertiary, props.className)}
      disabled={loading || htmlProps.disabled}
    >
      {props.children}
    </button>
  );
};
