import React, { ComponentPropsWithoutRef } from "react";
import { useHookFormMask } from "use-mask-input";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

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

const PhoneInput = (props: Props) => {
  const registerWithMask = useHookFormMask(props.register);
  if (!registerWithMask) {
    return <div>Provide registerWithMask</div>;
  }
  return (
    <input
      {...registerWithMask("phone", ["+38 (999) 999-99-99"], {
        required: true,
      })}
      type="text"
      inputMode="tel"
      placeholder={props.placeholder}
    />
  );
};

export default PhoneInput;
