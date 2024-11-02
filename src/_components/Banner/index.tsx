import React from "react";

import Socials from "../Socials";

import styles from "./style.module.scss";
import { Page } from "@/payload-types";
import RichText from "@/_components/RichText";
import Section from "@/_components/Section";
import classNames from "classnames";
import CustomImage from "@/_components/CustomImage";
import VideoPlayer from "@/_components/VideoPlayer";
import CTALink from "@/_components/CTA/CTALink";

const Banner = async ({
  title,
  page,
  video,
}: {
  page: Page;
  title: string;
  video?: boolean;
}) => {
  const {
    banner: { media, newLink },
  } = page;

  if (!media) {
    return <></>;
  }

  return (
    <Section
      className={styles.banner}
      isFull
      isContainer
      media={
        video ? (
          <VideoPlayer media={media} />
        ) : (
          <CustomImage media={media} loading="eager" fill />
        )
      }
    >
      <div className={classNames(styles.container, "grid-content")}>
        <div className={styles.details}>
          <h1 dangerouslySetInnerHTML={{ __html: title }} />
          <RichText content={page.banner.caption_html} />
        </div>
        <div className={styles.right}>
          <div className={styles.rightInner}>
            <Socials />
            <CTALink link={newLink} />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Banner;
