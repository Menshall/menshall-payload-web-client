"use client";

import React from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";
import { useScheduleStore } from "@/stores/schedule";

const total = 7;
const Header = () => {
  const currentStep = useScheduleStore((state) => state.currentStep);
  return (
    <nav className={styles.header}>
      {currentStep <= total && (
        <>
          <div className={styles.indicator}>
            {new Array(total).fill("").map((_, index) => {
              const currentClass =
                index + 1 === currentStep ? styles.current : "";
              const passedClass = index + 1 < currentStep ? styles.passed : "";
              return (
                <span
                  key={index}
                  className={classNames(currentClass, passedClass)}
                />
              );
            })}
          </div>
          <div className={styles.stepCounter}>
            <span>Крок </span>
            <span>{currentStep}</span> із <span>7</span>
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
