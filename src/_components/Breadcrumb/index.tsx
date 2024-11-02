import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import Typography from "../Typography";

type IBreadcrumb = {
  label: string;
  link: string;
};

interface IBreadcrumbs {
  breadcrumbs: Array<IBreadcrumb>;
}

const Breadcrumb = ({ breadcrumbs }: IBreadcrumbs) => {
  return (
    <div className={styles.breadcrumb}>
      {breadcrumbs.map(({ label, link }, index) => (
        <React.Fragment key={link}>
          <Link prefetch={true} href={link} className={styles.link}>
            <Typography size={3}>{label}</Typography>
          </Link>
          {index + 1 < breadcrumbs.length && <span>/</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
