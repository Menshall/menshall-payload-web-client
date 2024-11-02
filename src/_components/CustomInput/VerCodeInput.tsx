// src/VerificationCodeInput.tsx

import React, { useState, useRef, useEffect } from "react";
import styles from "./styles1.module.scss";

interface VerificationCodeInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  length = 6,
  onComplete,
}) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= length) {
      const newValues = value
        .split("")
        .concat(Array(length - value.length).fill(""));
      setValues(newValues);

      if (value.length === length) {
        onComplete(value);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputRef.current) {
      const value = inputRef.current.value;
      if (value.length > 0) {
        // const newValue = value.slice(0, -1);
        // inputRef.current.value = newValue;
        // setValues(
        //   newValue.split("").concat(Array(length - newValue.length).fill(""))
        // );
      }
    }
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.verificationCodeInput} onClick={handleClick}>
      <input
        type="text"
        inputMode="numeric"
        maxLength={length}
        ref={inputRef}
        value={values.join("")}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={styles.hiddenInput}
        autoComplete="one-time-code"
        autoFocus
      />
      {values.map((value, index) => (
        <div key={index} className={styles.inputBox}>
          {value}
        </div>
      ))}
    </div>
  );
};

export default VerificationCodeInput;
