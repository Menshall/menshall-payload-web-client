import React from "react";

import Typography from "../../../../_components/Typography";

import styles from "./styles.module.scss";
import Summary from "@/_components/Schedule/Summary";
import { useGeneralData } from "@/providers/general";

const Success = () => {
  const { contacts, schedule } = useGeneralData();
  return (
    <article className={styles.content}>
      <Summary contacts={contacts} />
      <Typography size={2}>{schedule.successSubtitle}</Typography>
      <Typography size={2}>
        {schedule.successText}
        <a href={contacts.phoneNumber.url}>{contacts.phoneNumber.label}</a>
      </Typography>
      <h5>{schedule.successGreeting}</h5>
    </article>
  );
};

export default Success;
