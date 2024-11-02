"use client";

import * as React from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";

import Services from "../../../_components/Services";
import Typography from "../../../_components/Typography";

import styles from "./styles.module.scss";
import { Service } from "@/payload-types";
import { Icon } from "@/_components/Icon";

const ServicePopup = ({
  parent,
  services,
}: {
  parent: string;
  services: Service;
}) => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const servicePaths = services.services.map((s) =>
    s.newLink?.type === "page" ? s.newLink.pageUrl : s.newLink?.customUrl,
  );

  React.useEffect(() => setOpen(false), [pathname]);
  const onMenuClick = () => setOpen(true);
  const onCloseClick = () => setOpen(false);

  const btnClassName = classNames(
    styles.serviceButton,
    servicePaths.includes(pathname.substring(1)) ? styles.active : styles.link,
  );

  return (
    <div className={styles.container}>
      <button onClick={onMenuClick} className={btnClassName}>
        <Icon
          name="menu-left"
          width={16}
          height={16}
          color="var(--primary-dark)"
        />
        <Typography size={3}>{parent}</Typography>
      </button>
      <div
        className={classNames(styles.serviceContent, open ? styles.open : "")}
      >
        <div className={styles.heading}>
          <h4>{services.title}</h4>
          <button onClick={onCloseClick} className={styles.close}>
            <Icon name="close" width={24} height={24} />
          </button>
        </div>
        <Services
          services={services}
          isAllVisible
          withDescription={false}
          isBig={false}
        />
      </div>
    </div>
  );
};
export default ServicePopup;
