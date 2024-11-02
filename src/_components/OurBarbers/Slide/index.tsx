"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Typography from "../../Typography";

import styles from "./styles.module.scss";
import CustomImage from "@/_components/CustomImage";
import { Icon } from "@/_components/Icon";
import { useScheduleStore } from "@/stores/schedule";
import classNames from "classnames";

const BarberSlide = (props: any) => {
  const router = useRouter();
  const onRedirectToMaster = useScheduleStore(
    (state) => state.actions.onRedirectToMaster,
  );
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (props.bookable) {
      onRedirectToMaster(props.location, props.id);
      router.push("/schedule");
    }
  };

  return (
    <Link
      prefetch={true}
      href={`/schedule?location=${props.location}&master=${props.id}`}
      onClick={onClick}
      className={classNames(
        styles.card,
        !props.bookable ? styles.disabled : "",
      )}
    >
      {props.image && <CustomImage media={props.image} />}
      <div className={styles.content}>
        <div className={styles.desc}>
          <h4>{props.name}</h4>
          <Typography size={3}>{props.specialization}</Typography>
        </div>
        {props.bookable && (
          <span className={styles.link}>
            {props.buttonText}
            <Icon name="arrow-top" color="var(--primary-dark)" />
          </span>
        )}
      </div>
    </Link>
  );
};

export default BarberSlide;
