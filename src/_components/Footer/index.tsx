"use client";

import React from "react";
import classes from "@/_components/Footer/index.module.scss";
import ScrollToTopButton from "@/_components/ScrollToTopButton";
import Link from "next/link";
import Typography from "@/_components/Typography";
import Socials from "@/_components/Socials";
import CustomImage from "@/_components/CustomImage";
import { useGeneralData } from "@/providers/general";
import CTALink from "@/_components/CTA/CTALink";

const FooterServerComponent = () => {
  const { footer, contacts, settings } = useGeneralData();

  if (!footer) {
    return <div>No Footer</div>;
  }

  return (
    <footer className="grid-container grid-content-full">
      <div className="grid-content">
        <div className={classes.footer}>
          <div className={classes.nav}>
            <ScrollToTopButton />
            <div className={classes.logo}>
              {settings.logo && (
                <Link href="/" prefetch={true}>
                  <CustomImage media={settings.logo} width={64} height={64} />
                </Link>
              )}
              <Typography size={3}>{footer.title}</Typography>
              <Socials />
            </div>
            <nav className={classes.menus}>
              {footer?.sections?.map(({ links, label }) => {
                return (
                  <div key={label} className={classes.menu}>
                    <h5>{label}</h5>
                    {links?.map(({ newLink }, i) => (
                      <Typography size={4} key={i}>
                        <CTALink link={newLink} />
                      </Typography>
                    ))}
                  </div>
                );
              })}
              <div className={classes.menu}>
                <h5>{contacts?.general?.title}</h5>
                {contacts.addressGroup.addresses.map(({ links }) => {
                  return links.map(({ newLink }) => (
                    <Typography size={4} key={newLink?.label}>
                      <CTALink link={newLink} />
                    </Typography>
                  ));
                })}
                <Typography size={4}>
                  <a href={contacts.phoneNumber.url}>
                    {contacts.phoneNumber.label}
                  </a>
                </Typography>
              </div>
            </nav>
          </div>
          <div className={classes.bottom}>
            <Typography size={4}>© 2024 {contacts?.copyright}</Typography>
            <Socials />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterServerComponent;
