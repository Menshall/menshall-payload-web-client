"use client";

import React from "react";
import classNames from "classnames";

import useScroll from "@/hooks/useScroll";

import styles from "./styles.module.scss";

const GradientBg = () => {
  const scroll = useScroll();
  return (
    <span
      className={classNames(
        styles.regular,
        "full-width",
        scroll.y > 100 ? styles.highlighted : ""
      )}
    />
  );
};

export default GradientBg;
