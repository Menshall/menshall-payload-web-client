import React from "react";
import Location from "@/_components/Schedule/Steps/Location";
import Master from "@/_components/Schedule/Steps/Master";
import Service from "@/_components/Schedule/Steps/Service";
import DateStep from "@/_components/Schedule/Steps/Date";
import Time from "@/_components/Schedule/Steps/Time";
import Submit from "@/_components/Schedule/Steps/Submit";
import Success from "@/_components/Schedule/Steps/Success";
import { useScheduleStore } from "@/stores/schedule";
import { Services } from "../../../../app-types";

const MasterFlow = () => {
  const currentStep = useScheduleStore((state) => state.currentStep);
  const masters = useScheduleStore((state) => state.masters);
  const { updateSelected, getServices, getMasters, getDates, next, getTimes } =
    useScheduleStore((state) => state.actions);

  const onSelectLocation = (location: string) => {
    updateSelected({ location });
    if (location) {
      getMasters(true);
    }
  };

  const onSelectMaster = (e: React.ChangeEvent<HTMLInputElement>) => {
    const master = masters.find(({ id }) => String(id) === e.target.value);
    updateSelected({ master });
    getServices();
  };

  const onSelectService = (services: Services) => {
    updateSelected({ services });
    getDates();
  };

  const onSelectTime = (time: string) => {
    updateSelected({ time });
    next();
  };

  const onSelectDate = (date: string) => {
    updateSelected({ date, time: "" });
    if (date) {
      getTimes();
    }
  };

  switch (currentStep) {
    case 2:
      return <Location onSelectLocation={onSelectLocation} />;
    case 3:
      return <Master onSelectMaster={onSelectMaster} />;
    case 4:
      return <Service onSelectService={onSelectService} />;
    case 5:
      return <DateStep onSelectDate={onSelectDate} />;
    case 6:
      return <Time onSelectTime={onSelectTime} />;
    case 7:
      return <Submit />;
    case 8:
      return <Success />;
  }

  return null;
};

export default MasterFlow;
