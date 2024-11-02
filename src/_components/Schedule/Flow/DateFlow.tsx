import React from "react";
import { useScheduleStore } from "@/stores/schedule";
import Location from "@/_components/Schedule/Steps/Location";
import Master from "@/_components/Schedule/Steps/Master";
import Service from "@/_components/Schedule/Steps/Service";
import DateStep from "@/_components/Schedule/Steps/Date";
import Time from "@/_components/Schedule/Steps/Time";
import Submit from "@/_components/Schedule/Steps/Submit";
import Success from "@/_components/Schedule/Steps/Success";
import { Services } from "../../../../app-types";

const DateFlow = () => {
  const currentStep = useScheduleStore((state) => state.currentStep);
  const masters = useScheduleStore((state) => state.masters);
  const updateSelected = useScheduleStore(
    (state) => state.actions.updateSelected,
  );
  const getDates = useScheduleStore((state) => state.actions.getDates);
  const getMasters = useScheduleStore((state) => state.actions.getMasters);
  const getServices = useScheduleStore((state) => state.actions.getServices);
  const getCategories = useScheduleStore(
    (state) => state.actions.getCategories,
  );
  const getTimes = useScheduleStore((state) => state.actions.getTimes);

  const onSelectLocation = (location: string) => {
    updateSelected({ location });
    if (location) {
      getCategories();
    }
  };

  const onSelectMaster = (e: any) => {
    const master = masters.find(({ id }) => String(id) === e.target.value);
    updateSelected({ master });
    getServices(true);
  };

  const onSelectService = (services: Services) => {
    const categories = services.map((s) => s.category_id);
    updateSelected({ services, categories });
    getDates();
  };

  const onSelectTime = (time: any) => {
    updateSelected({ time });
    getMasters(true);
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
      return <Service onSelectService={onSelectService} />;
    case 4:
      return <DateStep onSelectDate={onSelectDate} />;
    case 5:
      return <Time onSelectTime={onSelectTime} />;
    case 6:
      return <Master onSelectMaster={onSelectMaster} />;
    case 7:
      return <Submit />;
    case 8:
      return <Success />;
  }

  return null;
};

export default DateFlow;
