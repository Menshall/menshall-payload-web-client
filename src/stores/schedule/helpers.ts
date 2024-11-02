import { initialState } from ".";
import { ScheduleStoreProps } from "@/stores/schedule/types";

export const goBackOnSMasterFlow = (
  state: ScheduleStoreProps,
): ScheduleStoreProps | Partial<ScheduleStoreProps> => {
  const prevStep = state.currentStep - 1;

  switch (prevStep) {
    case 6:
      return {
        selected: { ...state.selected, time: "" },
        currentStep: prevStep,
      };
    case 5:
      return {
        selected: { ...state.selected, date: "" },
        times: [],
        currentStep: prevStep,
      };
    case 4:
      return {
        selected: { ...state.selected, services: [] },
        dates: [],
        currentStep: prevStep,
      };
    case 3:
      return {
        selected: { ...state.selected, master: undefined, services: [] },
        dates: [],
        services: [],
        currentStep: prevStep,
      };
    case 2:
      return {
        selected: { ...state.selected, location: "" },
        masters: [],
        currentStep: prevStep,
      };
    case 1:
      return {
        selected: { ...state.selected, flow: undefined },
        currentStep: prevStep,
      };
    default:
      return initialState;
  }
};

export const goBackOnServiceFlow = (
  state: ScheduleStoreProps,
): ScheduleStoreProps | Partial<ScheduleStoreProps> => {
  const prevStep = state.currentStep - 1;

  switch (prevStep) {
    case 6:
      return {
        currentStep: prevStep,
        selected: { ...state.selected, master: undefined },
      };
    case 5:
      return {
        currentStep: prevStep,
        selected: { ...state.selected, time: "" },
        masters: [],
      };
    case 4:
      return {
        currentStep: prevStep,
        selected: { ...state.selected, date: "" },
        times: [],
      };
    case 3:
      return {
        currentStep: prevStep,
        selected: {
          ...state.selected,
          categories: [],
          services: [],
        },
        dates: [],
      };
    case 2:
      return {
        currentStep: prevStep,
        selected: {
          ...state.selected,
          location: "",
          categories: [],
          services: [],
        },
        services: [],
      };
    case 1:
      return {
        selected: { ...state.selected, flow: undefined },
        currentStep: prevStep,
      };
    default:
      return initialState;
  }
};
