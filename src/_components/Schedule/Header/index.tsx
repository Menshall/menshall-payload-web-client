"use client";

import React from "react";
import classNames from "classnames";
import Link from "next/link";

import styles from "./styles.module.scss";
import CustomImage from "@/_components/CustomImage";
import { useGeneralData } from "@/providers/general";
import { useScheduleStore } from "@/stores/schedule";

const total = 7;
const Header = () => {
  const { settings, schedule } = useGeneralData();

  const currentStep = useScheduleStore((state) => state.currentStep);
  return (
    <header className={classNames("grid-content", styles.header)}>
      <div className={styles.headerInner}>
        {settings.logo && (
          <div className={styles.logo}>
            <Link prefetch={true} href="/" aria-label="Home Link">
              <CustomImage
                media={settings.logo}
                width={56}
                height={56}
                loading="eager"
              />
            </Link>
          </div>
        )}
        <nav className={styles.nav}>
          {currentStep <= total && (
            <div>
              <h4>{schedule.title}</h4>
              <div className={styles.indicator}>
                {new Array(total).fill("").map((_, index) => {
                  const currentClass =
                    index + 1 === currentStep ? styles.current : "";
                  const passedClass =
                    index + 1 < currentStep ? styles.passed : "";
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
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
