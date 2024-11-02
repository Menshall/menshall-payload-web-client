"use client";

import React from "react";
import PostSlide from "../Slide";

import { EmblaOptionsType } from "embla-carousel";
import styles from "../styles.module.scss";
import EmblaCarousel from "@/_components/Embla";
import { Post } from "@/payload-types";
import Section from "@/_components/Section";

const OPTIONS: EmblaOptionsType = {
  align: "start",
};

const Slider = ({
  title,
  posts,
}: {
  title: React.ReactNode;
  posts: Array<Post>;
}) => {
  return (
    <Section className="grid-container grid-content-full">
      <EmblaCarousel
        className={styles.slider}
        viewportClassName={styles.viewport}
        options={OPTIONS}
        slides={posts}
        slide={PostSlide}
        title={title}
      />
    </Section>
  );
};

export default Slider;
