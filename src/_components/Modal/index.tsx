"use client";
import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import styles from "./styles.module.scss";
import { Icon } from "@/_components/Icon";

const Modal = ({
  open,
  onClose,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  const modalRoot = document.getElementById("portal");

  const handleOverlayClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return open && modalRoot
    ? ReactDOM.createPortal(
        <div
          className={classNames(styles.container, className || "")}
          onClick={handleOverlayClick}
        >
          <div className={styles.modal}>
            <button className={styles.close} onClick={onClose}>
              <Icon name="close" width={24} height={24} />
            </button>
            {children}
          </div>
        </div>,
        modalRoot,
      )
    : null;
};

export default Modal;
