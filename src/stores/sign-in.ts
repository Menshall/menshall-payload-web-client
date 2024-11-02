import { create } from "zustand";
import { fetchLocalEndpoint } from "@/fetch";
import { loginUser, logoutUser } from "@/lib/cookies";

type SignInStoreProps = {
  sendCode: () => void;
  setTime: (id: NodeJS.Timeout) => void;
  retry: () => void;
  resetState: () => void;
  logout: () => void;
  login: (code: string) => void;
  loading: null | boolean;
  status: undefined | "loggedOut" | "loggedIn";
  time: number;
  phone: string;
  isPhoneValid: boolean;
  phoneIsSent: boolean;
  error: string;
  updateState: (newState: SignInStoreProps | Partial<SignInStoreProps>) => void;
};

export const initialData = {
  time: 0,
  phone: "",
  isPhoneValid: false,
  phoneIsSent: false,
  error: "",
  status: undefined,
  loading: null,
};

export const useSignInStore = create<SignInStoreProps>((set, getState) => {
  return {
    ...initialData,
    setTime: (id) => {
      const { time } = getState();
      if (time === 0) {
        clearInterval(id);
        set({ time: 0 });
      } else {
        set({ time: time - 1 });
      }
    },
    sendCode: async () => {
      const { phone } = getState();
      set({
        phoneIsSent: true,
      });
      await fetchLocalEndpoint({
        url: "login",
        body: { phone },
        onSuccess: () => {
          set({ time: 60 });
        },
        onFailure: (error) => {
          set({ error: error.message });
        },
      });
    },
    resetState: () => set(initialData),
    updateState: (newState: SignInStoreProps | Partial<SignInStoreProps>) =>
      set(() => newState),
    login: async (code) => {
      const { phone } = getState();
      await fetchLocalEndpoint({
        url: "auth",
        body: { phone, code },
        onSuccess: loginUser,
        onBefore: () => {
          set({ loading: true });
        },
        onFailure: (error) => {
          set({ error: error.message, loading: false });
        },
      });
    },
    logout: logoutUser,
    retry: async () => {
      const { phone } = getState();

      await fetchLocalEndpoint({
        url: "retry",
        body: { phone },
        onSuccess: () => {
          set({
            time: 60,
          });
        },
        onFailure: (error) => {
          set({ error: error.message });
        },
      });
    },
  };
});

// useSignInStore.subscribe((state, prevState) => {
//   console.log({ state });
//   console.log({ prevState });
// });
