import React from "react";
import styles from "./styles.module.scss";
import { Contact, Header, Settings } from "@/payload-types";
import HeaderLink from "@/_components/Header/Menu/HeaderLink";
import CustomImage from "@/_components/CustomImage";
import { Icon } from "@/_components/Icon";
import RoundButton from "@/_components/Header/RoundButton";
import CTALink from "@/_components/CTA/CTALink";

const MobileNav = ({
  header,
  settings,
  contacts,
}: {
  header: Header;
  settings: Settings;
  contacts: Contact;
}) => {
  const { navItems, title, newLink } = header;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.logoBg}>
        {settings.bgLogo && (
          <CustomImage media={settings.bgLogo} width={600} height={700} />
        )}
        <div className={styles.radialGradient}>
          <svg height="100%" width="100%">
            <defs>
              <radialGradient
                id="0"
                gradientTransform="translate(-0.03 -0.01) scale(2, 2)"
              >
                <stop offset="19%" stopColor="#13d91b" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect fill="url(#0)" height="100%" width="100%" />
          </svg>
        </div>
      </div>
      <div className={styles.list}>
        <nav className={styles.nav}>
          {navItems.map(({ hasSubItems, subNavItems, newLink }) => {
            if (hasSubItems) {
              return (
                <React.Fragment key={newLink?.label}>
                  <h5 className={styles.subtitle}>
                    {newLink?.secondaryLabel || newLink?.label}
                  </h5>
                  <div className={styles.subnav}>
                    {subNavItems?.map(({ newLink }) => (
                      <HeaderLink
                        key={newLink?.label}
                        link={newLink}
                        size={1}
                      />
                    ))}
                  </div>
                </React.Fragment>
              );
            }
            return <HeaderLink key={newLink?.label} link={newLink} size={1} />;
          })}
        </nav>
        <div className={styles.bottom}>
          {/*<Socials />*/}
          <CTALink link={newLink} className={styles.button} />
          <div className={styles.phones}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
