import React from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";
import CustomImage from "@/_components/CustomImage";
import { Icon } from "@/_components/Icon";

const SelectableCard = ({
  children,
  image,
  className = "",
  onChange,
  id,
  checked,
  type,
  name,
  ratio,
  disabled = false,
  icon,
}: any) => {
  return (
    <div
      className={classNames(
        styles.card,
        checked ? styles.checked : "",
        disabled ? styles.disabled : "",
        className,
      )}
      style={{
        aspectRatio: ratio,
      }}
    >
      <input
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        value={id}
        checked={checked}
        disabled={disabled}
      />
      {checked && (
        <span className={styles.checkmark}>
          <Icon name="check" width={24} height={24} />
        </span>
      )}
      {icon && !image && <Icon name={icon} />}
      {image && !icon && <CustomImage media={image} width={320} height={160} />}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default SelectableCard;
