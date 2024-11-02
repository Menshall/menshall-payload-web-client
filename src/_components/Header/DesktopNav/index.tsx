import React from "react";
import styles from "./styles.module.scss";
import ServicePopup from "@/_components/Header/ServicePopup";
import { Header, Service } from "@/payload-types";
import HeaderLink from "@/_components/Header/Menu/HeaderLink";

const DesktopNav = ({
  header,
  services,
}: {
  header: Header;
  services: Service;
}) => {
  return (
    <nav className={styles.nav}>
      {header.navItems.map(({ newLink, subNavItems }, i) => {
        if (i === 0) {
          return "";
        }
        if (subNavItems && subNavItems.length) {
          return (
            <React.Fragment key={i}>
              <ServicePopup parent={newLink?.label || ""} services={services} />
              <span>/</span>
            </React.Fragment>
          );
        }
        return (
          <React.Fragment key={i}>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <HeaderLink link={newLink} />
            {i + 1 < header.navItems.length && <span>/</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default DesktopNav;
