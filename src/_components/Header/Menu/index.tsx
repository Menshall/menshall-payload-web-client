"use client";

import * as React from "react";
import GradientBg from "../GradientBg";

import styles from "./styles.module.scss";
import classNames from "classnames";
import RoundButton from "@/_components/Header/RoundButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useWindowSize from "@/hooks/useWindowSize";
import DesktopNav from "@/_components/Header/DesktopNav";
import MobileNav from "@/_components/Header/MobileNav";
import CustomImage from "@/_components/CustomImage";
import Drawer from "@/_components/Drawer";
import { useGeneralData } from "@/providers/general";
import { Icon } from "@/_components/Icon";
import CTALink from "@/_components/CTA/CTALink";

const Menu = () => {
  const { header, contacts, settings, services, user } = useGeneralData();
  const { navItems } = header;
  const { logo } = settings;
  const activeSlug = usePathname();
  const { windowWidth } = useWindowSize("desktop");
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  React.useEffect(() => setDrawerOpen(false), [activeSlug]);

  return (
    <header
      className={classNames(styles.header, "grid-container grid-content-full")}
    >
      <GradientBg />
      <div className={classNames(styles.inner, "grid-content")}>
        <div className={styles.logo}>
          <CTALink link={navItems[0].newLink} aria-label="Home Link">
            {logo && <CustomImage media={logo} height={56} width={56} />}
          </CTALink>
        </div>
        {windowWidth > 767 ? (
          <DesktopNav header={header} services={services} />
        ) : (
          <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
            <MobileNav
              header={header}
              settings={settings}
              contacts={contacts}
            />
          </Drawer>
        )}
        <div className={styles.right}>
          <RoundButton>
            <a href={contacts.phoneNumber.url}>
              <Icon
                name="phone"
                width={18}
                height={18}
                color="var(--primary-dark)"
              />
            </a>
          </RoundButton>
          <RoundButton>
            <Link
              prefetch={true}
              href={user?.token ? "/user-account" : "/sign-in"}
            >
              {user?.name ? (
                user.name[0]
              ) : (
                <Icon
                  name="account"
                  width={18}
                  height={18}
                  color="var(--primary-dark)"
                />
              )}
            </Link>
          </RoundButton>
          {windowWidth < 767 && (
            <button
              className={styles.hamburger}
              onClick={toggleDrawer}
              aria-label="Menu button"
            >
              {isDrawerOpen ? (
                <Icon name="close" width={24} height={24} />
              ) : (
                <Icon name="menu" width={24} height={24} />
              )}
            </button>
          )}
        </div>
        {/*<div className={styles.phones}>*/}
        {/*  {addresses.map(({ links, id }) => {*/}
        {/*    let label = "";*/}
        {/*    return links.map(({ link }, i) => {*/}
        {/*      if (link && link.url?.includes("https")) {*/}
        {/*        label = link.label.split(",")[0];*/}
        {/*        return "";*/}
        {/*      }*/}
        {/*      return (*/}
        {/*        <Typography className={styles.phoneNumber} size={3} key={i}>*/}
        {/*          <CTALink*/}
        {/*            key={i}*/}
        {/*            link={link}*/}
        {/*            {...link}*/}
        {/*            className={styles.phone}*/}
        {/*          >*/}
        {/*            {link.label}*/}
        {/*            <span className={styles.phoneIcon}>*/}
        {/*              <PhoneIcon />*/}
        {/*            </span>*/}
        {/*          </ButtonLink>*/}
        {/*        </Typography>*/}
        {/*      );*/}
        {/*    });*/}
        {/*  })}*/}
        {/*</div>*/}
      </div>
    </header>
  );
};

export default Menu;
