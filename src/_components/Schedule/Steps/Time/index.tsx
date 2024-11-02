import React from "react";
import classNames from "classnames";

import { dayMonthFormatter } from "@/_utilities/formatters";
import ChevronIcon from "./ChevronIcon";

import styles from "./styles.module.scss";
import { useScheduleStore } from "@/stores/schedule";

const TimePicker = ({
  onSelectTime,
}: {
  onSelectTime: (time: string) => void;
}) => {
  const times = useScheduleStore((state) => state.times);
  const date = useScheduleStore((state) => state.selected.date);
  const time = useScheduleStore((state) => state.selected.time);
  const getTimes = useScheduleStore((state) => state.actions.getTimes);

  const onNextDay = () => {
    const newDate = new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000);
    getTimes(newDate);
  };

  const isDisabledPrev =
    new Date().toLocaleDateString("uk") ===
    new Date(date).toLocaleDateString("uk");
  const onPrevDay = () => {
    const newDate = new Date(new Date(date).getTime() - 24 * 60 * 60 * 1000);
    getTimes(newDate);
  };

  return (
    <div className={styles.timepicker}>
      <div className={styles.header}>
        <div className={styles.top}>
          <h4>{`${dayMonthFormatter.format(new Date(date))}, ${new Date(
            date,
          ).getFullYear()}`}</h4>
        </div>
        <div className={styles.buttons}>
          <button onClick={onPrevDay} disabled={isDisabledPrev}>
            <ChevronIcon />
          </button>
          <button onClick={onNextDay} disabled={false}>
            <ChevronIcon />
          </button>
        </div>
      </div>
      <div className={styles.times}>
        {times.length > 0
          ? times.map((timeSlot) => {
              return (
                <div
                  className={classNames(
                    styles.time,
                    timeSlot.datetime === time ? styles.checked : "",
                  )}
                  key={timeSlot.datetime}
                >
                  <input
                    type="radio"
                    id={timeSlot.datetime}
                    name="master"
                    onChange={(e) => onSelectTime(e.target.value)}
                    value={timeSlot.datetime}
                    checked={timeSlot.datetime === time}
                  />
                  <label htmlFor={timeSlot.datetime}>{timeSlot.time}</label>
                </div>
              );
            })
          : null}
      </div>
      {/*<div className={styles.times}>*/}
      {/*  {times.length > 0 ? (*/}
      {/*    slots.map((slot) => {*/}
      {/*      const exist = times.find((t) => t.time === slot);*/}
      {/*      if (exist) {*/}
      {/*        return (*/}
      {/*          <div*/}
      {/*            className={classNames(*/}
      {/*              styles.time,*/}
      {/*              exist.datetime === time ? styles.checked : '',*/}
      {/*            )}*/}
      {/*            key={exist.datetime}*/}
      {/*          >*/}
      {/*            <input*/}
      {/*              type="radio"*/}
      {/*              id={exist.datetime}*/}
      {/*              name="master"*/}
      {/*              onChange={onSelectTime}*/}
      {/*              value={exist.datetime}*/}
      {/*              checked={exist.datetime === time}*/}
      {/*            />*/}
      {/*            <label htmlFor={exist.datetime}>{exist.time}</label>*/}
      {/*          </div>*/}
      {/*        );*/}
      {/*      }*/}

      {/*      return (*/}
      {/*        <div*/}
      {/*          className={classNames(styles.time, styles.disabled)}*/}
      {/*          key={slot}*/}
      {/*        >*/}
      {/*          <input*/}
      {/*            type="radio"*/}
      {/*            name="master"*/}
      {/*            onChange={onSelectTime}*/}
      {/*            checked={false}*/}
      {/*            disabled*/}
      {/*          />*/}
      {/*          <label>{slot}</label>*/}
      {/*        </div>*/}
      {/*      );*/}
      {/*    })*/}
      {/*  ) : (*/}
      {/*    <div className={styles.empty}>*/}
      {/*      На цей день немає вільних місць*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
};

export default TimePicker;
