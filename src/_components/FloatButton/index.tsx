"use client";
import React from "react";
import classNames from "classnames";
import Link from "next/link";

import useScroll from "@/hooks/useScroll";
import useWindowSize from "@/hooks/useWindowSize";

import styles from "./styles.module.scss";

const FloatButton = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const scroll = useScroll();
  const { windowHeight } = useWindowSize();

  React.useEffect(() => {
    if (scroll.y > windowHeight && !isVisible) {
      setIsVisible(true);
    } else if (scroll.y < windowHeight && isVisible) {
      setIsVisible(false);
    }
  }, [scroll.y, windowHeight, isVisible]);

  return (
    <Link
      prefetch={true}
      href="/schedule"
      className={classNames(
        styles.floatButton,
        isVisible ? styles.visible : "",
      )}
    >
      <span className={styles.gradient} />
      <span className={styles.text}>Записатись</span>
    </Link>
  );
};

export default FloatButton;
