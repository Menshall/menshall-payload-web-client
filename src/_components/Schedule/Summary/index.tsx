import React from "react";
import classNames from "classnames";
import {
  dayMonthFormatter,
  timeFormatter,
  timing,
} from "@/_utilities/formatters";

import styles from "./styles.module.scss";
import { useGeneralData } from "@/providers/general";
import { useScheduleStore } from "@/stores/schedule";
import { Icon } from "@/_components/Icon";
import Typography from "@/_components/Typography";

const Detail = ({ children }: { children?: React.ReactNode }) =>
  children ? <Typography size={2}>{children}</Typography> : <></>;

const Summary = ({ className = "" }: any) => {
  const { contacts } = useGeneralData();
  const { location, master, date, services, time, flow } = useScheduleStore(
    (state) => state.selected,
  );
  const currentStep = useScheduleStore((state) => state.currentStep);

  const data = services.reduce(
    // @ts-ignore
    (acc, curr) => {
      return {
        price: acc.price + curr.price_max,
        services: [...acc.services, curr.title],
        time: acc.time + curr.seance_length,
      };
    },
    {
      price: 0,
      services: [],
      time: 0,
    } as {
      time: number;
      price: number;
      services: Array<string>;
    },
  );
  const selectedTime = time ? timeFormatter.format(new Date(time)) : "";

  const locationObj = contacts.addressGroup.addresses.find(
    (e: any) => e.location === location,
  );

  const price = React.useMemo(() => {
    if (flow === "master") {
      return data.price;
    }
    if (currentStep > 6) {
      return data.price;
    }
  }, [flow, currentStep, data.price]);

  return (
    <div className={classNames(styles.container, className)}>
      {master?.id && (
        <div className={styles.master}>
          <img src={master.avatar_big} alt="master" />
          <div>
            <Typography size={2}>{master.name}</Typography>
            <Typography size={4}>{master.position.title}</Typography>
          </div>
        </div>
      )}
      {locationObj?.links[0] !== undefined && (
        <div className={styles.item}>
          <Icon
            name="location"
            width={14}
            height={14}
            color="var(--primary-dark)"
          />
          <Detail>{locationObj?.links[0].newLink?.label}</Detail>
        </div>
      )}
      {data.services.length > 0 && (
        <ul className={styles.ul}>
          {data.services.map((s) => (
            <li key={s}>
              <Detail>{s}</Detail>
            </li>
          ))}
        </ul>
      )}

      {date && (
        <div className={styles.item}>
          <Icon
            name="calendar"
            width={14}
            height={14}
            color="var(--primary-dark)"
          />
          <Detail>{`${dayMonthFormatter.format(new Date(date))}`}</Detail>
          {selectedTime && (
            <>
              <Detail>•</Detail>
              <Detail>{selectedTime}</Detail>
              <Detail>•</Detail>
              <Detail>{timing(data.time)}</Detail>
            </>
          )}
        </div>
      )}
      {!!price && (
        <div className={styles.item}>
          <Icon
            name="price"
            width={14}
            height={14}
            color="var(--primary-dark)"
          />
          <Detail>{`${price} ₴`}</Detail>
        </div>
      )}
    </div>
  );
};

export default Summary;
