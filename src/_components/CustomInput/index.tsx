import React, { ComponentPropsWithoutRef, useState } from "react";
import styles from "./styles.module.scss";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import VerificationCodeInput from "@/_components/CustomInput/VerCodeInput";
import dynamic from "next/dynamic";

const PhoneInput = dynamic(
  () => import("../../_components/CustomInput/PhoneInput"),
  {
    ssr: false,
    loading: () => <input placeholder="+38" />,
  },
);

// @ts-ignore
interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string;
  textarea?: boolean;
  inputCode?: boolean;
  register?: any;
  onChange?:
    | ComponentPropsWithoutRef<"input">["onChange"]
    | ((value: string) => void);
  control?: any;
}

interface Props extends InputProps {
  field?: ControllerRenderProps<FieldValues, any>;
  fieldState?: ControllerFieldState;
  registerWithMask?: UseFormRegister<FormData>;
}

const CodeInput = (props: Props) => {
  // @ts-ignore
  return <VerificationCodeInput length={4} onComplete={props.onChange} />;
};

const RegularInput = (props: Props) => {
  return (
    // @ts-ignore
    <input
      {...props}
      {...(props.field ? props.field : {})}
      {...(props.fieldState ? props.fieldState : {})}
    />
  );
};

const TextArea = (props: Props) => {
  // @ts-ignore
  return <textarea {...props} />;
};

const CustomInput = ({
  register,
  error,
  inputCode,
  control,
  textarea,
  ...htmlProps
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  let Input = RegularInput;

  if (htmlProps.inputMode === "tel") {
    //@ts-ignore
    Input = PhoneInput;
  }

  if (inputCode) {
    Input = CodeInput;
  }

  if (textarea) {
    Input = TextArea;
  }

  return (
    <div className={styles.container}>
      <label htmlFor={htmlProps.name} className={styles.label}>
        {htmlProps.label}
        {htmlProps.required ? <span>*</span> : ""}
      </label>

      {register ? (
        <Controller
          control={control}
          name={htmlProps.name as string}
          render={({ field, fieldState }) => (
            <Input
              register={register}
              field={field}
              fieldState={fieldState}
              placeholder={htmlProps.placeholder}
            />
          )}
        />
      ) : (
        // @ts-ignore
        <Input
          {...htmlProps}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={isFocused ? "" : htmlProps.placeholder}
        />
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default CustomInput;
