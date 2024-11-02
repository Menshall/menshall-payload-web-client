import React from "react";

import SelectableCard from "@/_components/Schedule/SelectableCard";
import styles from "../../styles.module.scss";
import { useScheduleStore } from "@/stores/schedule";
import Typography from "@/_components/Typography";

const Flow = () => {
  const updateSelected = useScheduleStore(
    (state) => state.actions.updateSelected,
  );
  const flow = useScheduleStore((state) => state.selected.flow);

  return (
    <div className={styles.verticalCards}>
      <SelectableCard
        icon="barber"
        id={"master"}
        name="flow"
        type="radio"
        checked={"master" === flow}
        onChange={(e: any) => updateSelected({ flow: e.target.value }, true)}
      >
        <Typography size={2} style={{ width: "100%" }}>
          Записатися до майстра
        </Typography>
      </SelectableCard>
      <SelectableCard
        icon="calendar"
        id="service"
        name="flow"
        type="radio"
        checked={"service" === flow}
        onChange={(e: any) => updateSelected({ flow: e.target.value }, true)}
      >
        <Typography size={2} style={{ width: "100%" }}>
          Записатися на дату
        </Typography>
      </SelectableCard>
    </div>
  );
};

export default Flow;
