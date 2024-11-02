import React from "react";
import { useForm } from "react-hook-form";

import Summary from "../../Summary";
import { resolver } from "./resolver";

import styles from "./styles.module.scss";
import CustomInput from "@/_components/CustomInput";
import { useScheduleStore } from "@/stores/schedule";
import { ScheduleFormData } from "@/stores/schedule/types";
import { getUser } from "@/lib/cookies";

const Submit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    watch,
    setValue,
    control,
  } = useForm<ScheduleFormData>({ resolver });

  const updateFormData = useScheduleStore(
    (state) => state.actions.updateFormData,
  );

  //@ts-ignore
  const phoneValue = watch("phone");

  React.useEffect(() => {
    getUser().then((user) => {
      if (user) {
        //@ts-ignore
        setValue("name", user.name, { shouldValidate: true });
        //@ts-ignore
        setValue("phone", `+${user.phone}`, {
          shouldValidate: true,
        });
      }
    });
  }, []);

  React.useEffect(() => {
    if (phoneValue) {
      const replaced = phoneValue.replace(/[^0-9+]/g, "");
      //@ts-ignore
      setValue("phone", replaced);
    }
  }, [phoneValue]);

  React.useEffect(
    () => updateFormData({ isValid, ...getValues() }),
    [isValid, getValues],
  );

  return (
    <div className={styles.submit}>
      <div className={styles.summary}>
        <Summary />
      </div>
      <form onSubmit={handleSubmit(() => null)} className={styles.form}>
        <>
          <CustomInput
            name="name"
            type="text"
            label="Ваше Повне Імя"
            register={register}
            error={errors.name?.message}
            control={control}
            required
          />
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
          <CustomInput
            name="email"
            type="email"
            label="Електронна пошта"
            register={register}
            error={errors.email?.message}
            control={control}
          />
          <CustomInput
            name="text"
            type="text"
            label="Коментар до запису"
            register={register}
            error={errors.text?.message}
            control={control}
          />
        </>
      </form>
    </div>
  );
};

export default Submit;
