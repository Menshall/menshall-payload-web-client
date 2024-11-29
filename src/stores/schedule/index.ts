import { create } from "zustand";

import {
  convertServices,
  longDateFormat,
  phoneFormatter,
} from "@/_utilities/formatters";
import { goBackOnServiceFlow, goBackOnSMasterFlow } from "./helpers";
import { Master, Masters, Services } from "@/app-types";
import { fetchLocalEndpoint } from "@/fetch";
import { getToken } from "@/lib/cookies";
import {
  ServicesWithCategoryTitle,
  ScheduleState,
  ScheduleStoreProps,
} from "@/stores/schedule/types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
export const initialData: ScheduleState = {
  currentStep: 1,
  repeatLoading: false,
  loading: false,
  error: "",
  isReschedule: false,
  masters: [],
  services: [],
  dates: [],
  times: [],
  formData: {
    isValid: false,
    name: "",
    email: "",
    phone: "",
    text: "",
  },
  selected: {
    location: "",
    services: [],
    date: "",
    time: "",
    master: {} as Master,
    categories: [],
  },
};
export const initialState: ScheduleStoreProps = {
  ...initialData,
  actions: {
    setLoading: () => null,
    next: () => null,
    prev: () => null,
    updateSelected: () => null,
    onRepeat: () => null,
    getMasters: () => null,
    getServices: () => null,
    getDates: () => null,
    getTimes: () => null,
    getCategories: () => null,
    submit: () => null,
    resetStore: () => null,
    reschedule: () => null,
    onReschedule: () => null,
    updateFormData: () => null,
    onRedirectToMaster: () => null,
  },
};

export const useScheduleStore = create<ScheduleStoreProps>()(
  (set, getState) => ({
    ...initialData,
    actions: {
      setLoading: (loading: boolean) => set(() => ({ loading })),
      resetStore: () => set(() => ({ ...initialData })),
      next: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prev: () => {
        const state = getState();
        const updatedData =
          state.selected.flow === "master"
            ? goBackOnSMasterFlow(state)
            : goBackOnServiceFlow(state);
        set(updatedData);
      },
      updateSelected: (values, goNext) => {
        const { selected, actions } = getState();
        set({ selected: { ...selected, ...values } });
        if (goNext) {
          actions.next();
        }
      },
      updateFormData: (newFormData) => {
        const prev = getState().formData;
        set({ formData: { ...prev, ...newFormData } });
      },
      onReschedule: async (visit) => {
        const { actions } = getState();
        const { company, services, staff } = visit;
        // @ts-ignore
        const servicesString = convertServices(services);

        set({
          currentStep: 5,
          repeatLoading: true,
          isReschedule: true,
          visit,
        });

        actions.updateSelected({
          flow: "master",
          location: String(visit.company.id),
        });

        await fetchLocalEndpoint({
          url: "masters",
          body: { location: visit.company.id },
          onSuccess: ({ masters }: { masters: Masters }) => {
            const master = masters.find((m) => m.id === staff.id);
            set({ masters });
            actions.updateSelected({
              master,
            });
          },
          onFailure: (error) => set({ error: error.message }),
        });

        const { selected } = getState();
        const { location, master } = selected;

        await fetchLocalEndpoint({
          url: "services",
          body: { location, masterId: master?.id },
          onSuccess: ({ services = [] }) => {
            set({
              services,
            });

            actions.updateSelected({
              services: visit.services as unknown as Services,
            });
          },
          onFailure: (error) => set({ error: error.message }),
        });

        await fetchLocalEndpoint({
          url: "date",
          body: {
            location: company.id,
            masterId: staff.id,
            servicesString,
          },
          onSuccess: ({ dates = [] }) => set({ dates }),
          onFailure: (error) => set({ error: error.message }),
        });

        set({ repeatLoading: false });
      },
      onRepeat: async (visit) => {
        const { actions } = getState();
        const { company, services, staff } = visit;
        // @ts-ignore
        const servicesString = convertServices(services);

        set({
          currentStep: 5,
          repeatLoading: true,
        });

        actions.updateSelected({
          flow: "master",
          location: String(visit.company.id),
        });

        await fetchLocalEndpoint({
          url: "masters",
          body: { location: visit.company.id },
          onSuccess: ({ masters = [] }: { masters: Masters }) => {
            const master = masters.find((m) => m.id === staff.id);
            set({ masters });
            actions.updateSelected({
              master,
            });
          },
          onFailure: (error) => set({ error: error.message }),
        });
        //
        const { selected } = getState();
        const { location, master } = selected;
        await fetchLocalEndpoint({
          url: "services",
          body: { location, masterId: master?.id },
          onSuccess: ({ services = [] }) => {
            set({
              services,
            });
            actions.updateSelected({
              services: visit.services as unknown as Services,
            });
          },
          onFailure: (error) => set({ error: error.message }),
        });

        await fetchLocalEndpoint({
          url: "date",
          body: {
            location: company.id,
            masterId: staff.id,
            servicesString,
          },
          onSuccess: ({ dates = [] }) => set({ dates }),
          onFailure: (error) => set({ error: error.message }),
        });

        set({ repeatLoading: false });
      },
      onRedirectToMaster: async (location, masterId) => {
        const { actions } = getState();

        set({
          currentStep: 4,
          repeatLoading: true,
        });

        await fetchLocalEndpoint({
          url: "masters",
          body: { location },
          onSuccess: ({ masters = [] }: { masters: Masters }) => {
            const master = masters.find(
              (m) => String(m.id) === String(masterId),
            );
            set({ masters });
            actions.updateSelected({
              flow: "master",
              location: location,
              master,
            });
          },
          onFailure: (error) => set({ error: error.message }),
        });

        await fetchLocalEndpoint({
          url: "services",
          body: { location, masterId },
          onSuccess: ({ services = [] }) => {
            set({
              services,
            });
          },
          onFailure: (error) => set({ error: error.message }),
        });
        set({ repeatLoading: false });
      },

      getServices: async (updateServices) => {
        const { selected, actions } = getState();
        const { master, location } = selected;
        await fetchLocalEndpoint({
          url: "services",
          body: { location, masterId: master?.id },
          onBefore: () => set({ loading: true }),
          onSuccess: ({
            services,
          }: {
            services: ServicesWithCategoryTitle;
          }) => {
            if (updateServices) {
              const allServices = services.map((s) => s.services).flat(1);
              const result = selected.services.map((s) => {
                const service = allServices.find((f) => f.id === s.id);
                return service || s;
              });
              actions.updateSelected({
                services: result,
              });
              actions.next();
            } else {
              set({ services });
              actions.next();
            }
            actions.setLoading(false);
          },
          onFailure: (error) => set({ error: error.message }),
        });
      },
      getCategories: async () => {
        const { selected, actions } = getState();
        await fetchLocalEndpoint({
          url: "categories",
          body: {
            location: selected.location,
            datetime: selected.time ? selected.time.split("+")[0] : "",
          },
          onBefore: () => set({ loading: true }),
          onSuccess: ({
            services,
          }: {
            services: ServicesWithCategoryTitle;
          }) => {
            set({ services, loading: false });
            actions.next();
          },
          onFailure: (error) => set({ error: error.message }),
        });
      },
      getMasters: async (goNext) => {
        const { actions, selected } = getState();
        const { location, time, services } = selected;
        const query = `${services.map((s) => `service_ids[]=${s.id}`).join("&")}&datetime=${time ? time.split("+")[0] : ""}`;
        await fetchLocalEndpoint({
          url: "masters",
          body: { location, query },
          onBefore: () => set({ loading: true }),
          onSuccess: ({ masters }: { masters: Masters }) => {
            set({ masters, loading: false });
            if (goNext) {
              actions.next();
            }
          },
          onFailure: (error) => set({ error: error.message }),
        });
      },
      getDates: async (goNext) => {
        const { selected, actions } = getState();
        const { location, master, services } = selected;
        const date = longDateFormat();
        const servicesString = convertServices(services);

        await fetchLocalEndpoint({
          url: "date",
          body: {
            location,
            masterId: master?.id,
            date,
            servicesString,
          },
          onBefore: () => set({ loading: true }),
          onSuccess: ({ dates = [] }) => {
            set({ dates, loading: false });
            if (goNext) {
              actions.next();
            }
          },
          onFailure: (error) => set({ error: error.message }),
        });
      },
      getTimes: async (newDate) => {
        const { actions, selected } = getState();
        const { location, master, services, date } = selected;
        const servicesString = convertServices(services);
        const formattedDate = longDateFormat(new Date(newDate || date));

        await fetchLocalEndpoint({
          url: "time",
          body: {
            location,
            masterId: master?.id || 0,
            date: formattedDate,
            servicesString,
          },
          onBefore: () => set({ loading: true }),
          onSuccess: ({ times = [] }) => {
            set({ times, loading: false });
            actions.updateSelected({ date: formattedDate });
            if (!newDate) {
              actions.next();
            }
          },
          onFailure: (error) => set({ error: error.message }),
        });
      },
      submit: async ({ name, email, text, phone }) => {
        const { selected, actions } = getState();
        const { location, master, services, time } = selected;

        const data = {
          fullname: name,
          phone: phoneFormatter(phone),
          email: email || "",
          comment: text,
          notify_by_sms: 24,
          referrer: "https://www.menshall.com.ua/",
          appointments: [
            {
              services: services.map((s) => s.id),
              staff_id: master?.id,
              datetime: time!.split("+")[0],
              id: 0,
            },
          ],
        };

        await fetchLocalEndpoint({
          url: "submit",
          body: { location, data },
          onBefore: () => set({ loading: true }),
          onSuccess: async () => {
            set({ loading: false });

            await supabase.from("logs").insert({
              fullname: data.fullname,
              phone: data.phone,
              email: data.email,
              comment: data.comment,
              appointments: JSON.stringify(data.appointments),
              error: false,
              success: true,
              date: new Date().toLocaleString(),
              location,
            });

            actions.next();
          },
          onFailure: async (error) => {
            await supabase.from("logs").insert({
              fullname: data.fullname,
              phone: data.phone,
              email: data.email,
              comment: data.comment,
              appointments: JSON.stringify(data.appointments),
              error,
              success: false,
              date: new Date().toLocaleString(),
              location,
            });
            set({ error: error.message });
          },
        });
      },
      reschedule: async (onSuccess) => {
        const { selected, visit } = getState();
        const { location, time } = selected;
        const token = await getToken();
        await fetchLocalEndpoint({
          url: "reschedule",
          body: {
            location,
            token,
            visitId: visit?.id,
            datetime: time ? time.split("+")[0] : "",
          },
          onBefore: () => set({ loading: true }),
          onSuccess: () => {
            set({ loading: false });
            onSuccess();
          },
          onFailure: (error) => set({ error: error.message }),
        });
      },
    },
  }),
);

// useScheduleStore.subscribe((state, prevState) => {
//   console.log({ state, prevState });
// });
