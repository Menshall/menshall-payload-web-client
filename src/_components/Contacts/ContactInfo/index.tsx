import React from "react";

import Socials from "../../Socials";
import Typography from "../../Typography";

import styles from "./styles.module.scss";
import { Contact } from "@/payload-types";
import CTALink from "@/_components/CTA/CTALink";

const ContactsInfo = ({ contacts }: { contacts: Contact }) => {
  const { general, emailGroup, workingHours, phoneNumber } = contacts;

  return (
    <div className={styles.details}>
      <h2>{general?.secondaryTitle}</h2>
      <CTALink link={general?.newLink} />

      <div className={styles.list}>
        {contacts.addressGroup.addresses.map(({ label, links }) => {
          return (
            <div key={label} className={styles.item}>
              <span>{label}</span>
              {links.map(({ newLink }) => (
                <Typography size={2} key={newLink?.label}>
                  <CTALink link={newLink} />
                </Typography>
              ))}
            </div>
          );
        })}
        {emailGroup?.emails?.map(({ newLink }) => {
          return (
            <div key={newLink?.label} className={styles.item}>
              {emailGroup?.emailTitle && <span>{emailGroup?.emailTitle}</span>}
              <Typography size={2}>
                <CTALink link={newLink} />
              </Typography>
            </div>
          );
        })}
        <div className={styles.item}>
          <span>{phoneNumber.title}</span>
          <Typography size={2}>
            <a href={phoneNumber.url}>{phoneNumber.label}</a>
          </Typography>
        </div>
        {workingHours?.title && workingHours?.text && (
          <div className={styles.item}>
            {workingHours?.title && <span>{workingHours?.title}</span>}
            {workingHours?.text && (
              <Typography size={2}>{workingHours?.text}</Typography>
            )}
          </div>
        )}
        <Socials />
      </div>
    </div>
  );
};

export default ContactsInfo;
