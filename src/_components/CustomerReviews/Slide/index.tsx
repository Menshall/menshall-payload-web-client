import React from "react";

import Typography from "../../Typography";

import styles from "./styles.module.scss";
import { Icon } from "@/_components/Icon";

const ReviewSlide = (props: any) => {
  const { text, link, user_name } = props;
  return (
    <a href={link} target="_blank" className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.avatar}>
            {String(user_name[0]).toUpperCase()}
          </div>
          <div className={styles.name}>
            <Typography size={3}>{user_name}</Typography>
          </div>
        </div>
      </div>
      <div className={styles.rate}>
        <div className={styles.stars}>
          {new Array(parseInt("5")).fill("").map((_, index) => (
            <Icon
              key={index}
              name="star"
              width={18}
              height={18}
              color="#FCA311"
            />
          ))}
        </div>
        <div className={styles.mark}>
          <Icon name="google-checkmark" width={10} height={10} />
          <Typography size={4}>Google Review</Typography>
        </div>
      </div>
      <div className={styles.comment}>
        <Typography size={2}>{text}</Typography>
      </div>
    </a>
  );
};

export default ReviewSlide;
