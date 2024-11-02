import React from "react";
import { useScheduleStore } from "@/stores/schedule";
import MasterFlow from "@/_components/Schedule/Flow/MasterFlow";
import DateFlow from "@/_components/Schedule/Flow/DateFlow";
import { FlowStep } from "@/_components/Schedule/Steps";

const Flow = () => {
  const flow = useScheduleStore((state) => state.selected.flow);

  if (!flow) {
    return <FlowStep />;
  }

  return flow === "master" ? <MasterFlow /> : <DateFlow />;
};

export default Flow;
