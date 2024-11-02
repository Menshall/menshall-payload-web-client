import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";

interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, toggleDrawer, children }) => {
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (isOpen) {
      // console.log(window.scrollY);
      scrollPositionRef.current = window.scrollY;
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollPositionRef.current);
    }
    return () => {
      // document.body.style.position = "";
      // document.body.style.top = "";
      // document.body.style.width = "";
      // window.scrollTo(0, scrollPositionRef.current);
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
        onClick={toggleDrawer}
      />
      <div className={`${styles.drawerWrapper} ${isOpen ? styles.open : ""}`}>
        {children}
      </div>
    </>
  );
};

export default Drawer;
