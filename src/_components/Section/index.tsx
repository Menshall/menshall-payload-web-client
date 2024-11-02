import React, { ComponentPropsWithoutRef } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  media?: React.ReactNode;
  heading?: React.ReactNode | string;
  isFull?: boolean;
  isContainer?: boolean;
}

const Section = (props: SectionProps) => {
  let title = <></>;

  if (typeof props.heading === "string") {
    title = <h2>{props.heading}</h2>;
  } else if (!!props.heading) {
    title = <div>{props.heading}</div>;
  }

  let className = "";

  if (props.isFull) {
    className = className + " grid-content-full";
  }

  if (props.isContainer) {
    className = className + " grid-container";
  }

  return (
    <section
      className={classNames(
        props.className,
        styles.section,
        className || "grid-content",
      )}
    >
      {props.media && (
        <div className={classNames(styles.bg, "grid-content-full")}>
          {props.media}
        </div>
      )}
      {title}
      {props.children}
    </section>
  );
};

export default Section;
