import React, { ComponentPropsWithoutRef } from "react";
import styles from "./styles.module.scss";

interface RoundButtonProps extends ComponentPropsWithoutRef<"div"> {}
const RoundButton = (props: RoundButtonProps) => {
  return <span className={styles.button} {...props} />;
};

export default RoundButton;
