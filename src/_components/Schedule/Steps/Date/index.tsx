import React from "react";
import { DayPicker } from "react-day-picker";
import { uk } from "date-fns/locale";

import { longDateFormat } from "@/_utilities/formatters";

import styles from "./styles.module.scss";
import { useScheduleStore } from "@/stores/schedule";

function getAllDatesInMonth(month: any, year: any) {
  let startDate = new Date(year, month, 1); // month is 0-indexed
  let endDate = new Date(year, month + 1, 1);
  let dates: Array<string> = [];
  while (startDate < endDate) {
    dates.push(longDateFormat(new Date(startDate))); // clone the date object
    startDate.setDate(startDate.getDate() + 1);
  }
  return dates;
}

const DateTime = ({
  onSelectDate,
}: {
  onSelectDate: (date: string) => void;
}) => {
  const dates = useScheduleStore((state) => state.dates);
  const date = useScheduleStore((state) => state.selected.date);

  const [disabled, setDisabled] = React.useState<Array<string>>([]);

  React.useEffect(
    () => onMonthChange(dates ? new Date(dates[0]) : new Date()),
    [],
  );

  const onMonthChange = (month: Date) => {
    // @ts-ignore
    const available = dates.map((date) => longDateFormat(new Date(date)));
    const disabled = getAllDatesInMonth(
      month.getMonth(),
      month.getFullYear(),
    ).filter((date) => available.indexOf(date) === -1);
    setDisabled(disabled);
  };

  return (
    <DayPicker
      mode="single"
      locale={uk}
      defaultMonth={dates ? new Date(dates[0]) : new Date()}
      selected={new Date(date)}
      //@ts-ignore
      onSelect={onSelectDate}
      classNames={{
        row: styles.row,
        tbody: styles.body,
        head_row: styles.headRow,
        head_cell: styles.headCell,
        button: styles.button,
        day_selected: styles.selected,
        day_disabled: styles.disabled,
        nav_button: styles.navButton,
        nav: styles.nav,
        caption: styles.caption,
        caption_label: styles.label,
        table: styles.table,
        root: styles.dayPicker,
      }}
      onMonthChange={onMonthChange}
      disabled={disabled.map((date) => new Date(date))}
    />
  );
};

export default DateTime;
