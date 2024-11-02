import * as React from "react";
import classNames from "classnames";

import Typography from "../../Typography";

import styles from "./styles.module.scss";
import { Service } from "@/payload-types";
import CustomImage from "@/_components/CustomImage";
import { Icon } from "@/_components/Icon";
import CTALink from "@/_components/CTA/CTALink";

interface ServiceCardProps {
  children: React.ReactNode;
  isBig?: boolean;
  //todo
  service: Service["services"][0];
}

const ServiceCard = ({ children, isBig = true, service }: ServiceCardProps) => {
  const { title, newLink, image } = service;
  return (
    <CTALink className={styles.card} link={newLink}>
      <div className={classNames(styles.image, isBig ? styles.bigImage : "")}>
        <CustomImage media={image} width={380} height={380} />
      </div>
      <div className={styles.description}>
        {children && (
          <Typography size={3} className={styles.text}>
            Детальніше
          </Typography>
        )}
        <div className={styles.content}>
          <h5>{title}</h5>
          {children && <div>{children}</div>}
        </div>
        <span className={styles.arrow}>
          <Icon
            name="arrow-top"
            color="var(--primary-dark)"
            width={24}
            height={24}
          />
        </span>
      </div>
    </CTALink>
  );
};

export default ServiceCard;
