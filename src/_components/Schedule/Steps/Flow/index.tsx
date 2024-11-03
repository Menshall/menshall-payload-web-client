import React from "react";

import SelectableCard from "@/_components/Schedule/SelectableCard";
import styles from "../../styles.module.scss";
import { useScheduleStore } from "@/stores/schedule";
import Typography from "@/_components/Typography";
import { useGeneralData } from "@/providers/general";

const Flow = () => {
  const updateSelected = useScheduleStore(
    (state) => state.actions.updateSelected,
  );
  const { schedule } = useGeneralData();
  const flow = useScheduleStore((state) => state.selected.flow);
  return (
    <div className={styles.verticalCards}>
      <SelectableCard
        id="master"
        image={schedule.master}
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
        id="service"
        image={schedule.service}
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
