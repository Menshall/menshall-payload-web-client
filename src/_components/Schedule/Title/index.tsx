import React from "react";
import styles from "@/_components/Schedule/styles.module.scss";
import { useScheduleStore } from "@/stores/schedule";
import { useGeneralData } from "@/providers/general";

const Title = () => {
  const flow = useScheduleStore((state) => state.selected.flow);
  const currentStep = useScheduleStore((state) => state.currentStep);
  const { schedule } = useGeneralData();

  return (
    <h3 className={styles.label}>
      {
        schedule.steps![currentStep - 1][
          flow === "service" ? "secondaryTitle" : "title"
        ]
      }
    </h3>
  );
};

export default Title;
