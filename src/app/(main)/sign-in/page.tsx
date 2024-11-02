"use client";

import React from "react";

import styles from "./styles.module.scss";
import CustomInput from "@/_components/CustomInput";
import Spinner from "@/_components/Spinner";
import { useForm } from "react-hook-form";
import { phoneResolver } from "@/_components/Schedule/Steps/Submit/resolver";
import { phoneFormatter } from "@/_utilities/formatters";
import { useSignInStore } from "@/stores/sign-in";
import { PrimaryButton } from "@/_components/CTA/Buttons/PrimaryButton";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<{ phone: string }>({ resolver: phoneResolver });

  const login = useSignInStore((state) => state.login);
  const resetState = useSignInStore((state) => state.resetState);
  const sendCode = useSignInStore((state) => state.sendCode);
  const loading = useSignInStore((state) => state.loading);
  // const time = useSignInStore((state) => state.time);
  const phoneIsSent = useSignInStore((state) => state.phoneIsSent);
  const error = useSignInStore((state) => state.error);
  const updateState = useSignInStore((state) => state.updateState);
  // const setTime = useSignInStore((state) => state.setTime);

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTime(timer);
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, [time]);

  const onChangeCode = async (code: string) => {
    if (code.length === 4) {
      login(code);
    }
  };

  React.useEffect(() => {
    return () => resetState();
  }, []);

  return (
    <div className="grid-content">
      <div className={styles.container}>
        <div className={styles.page}>
          <h4>Увійдіть до Аккаунту</h4>

          {loading ? (
            <Spinner />
          ) : (
            <form
              onSubmit={handleSubmit(({ phone }) => {
                updateState({
                  phone: phoneFormatter(phone),
                  isPhoneValid: isValid,
                });
                sendCode();
              })}
              className={styles.form}
            >
              {!phoneIsSent ? (
                <>
                  <CustomInput
                    name="phone"
                    inputMode="tel"
                    label="Введіть ваш номер телефону"
                    error={errors.phone?.message}
                    required
                    placeholder="+38"
                    control={control}
                    register={register}
                  />
                  <PrimaryButton type="submit" disabled={!isValid}>
                    Увійти
                  </PrimaryButton>
                </>
              ) : (
                <CustomInput onChange={onChangeCode} inputCode error={error} />
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
