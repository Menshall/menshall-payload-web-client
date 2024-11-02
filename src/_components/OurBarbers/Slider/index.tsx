import React from "react";
import { EmblaOptionsType } from "embla-carousel";

import EmblaCarousel from "../../Embla";
import Slide from "../Slide";

import styles from "../styles.module.scss";
import { Barbers } from "@/payload-types";
import Section from "@/_components/Section";

const OPTIONS: EmblaOptionsType = {
  align: "start",
};
const OurBarbers = ({
  title,
  buttonText,
  barbers,
}: {
  title: string;
  buttonText: string;
  barbers: any;
}) => {
  return (
    <Section isFull isContainer>
      <EmblaCarousel
        className={styles.slider}
        viewportClassName={styles.viewport}
        slideClassName={styles.slide}
        options={OPTIONS}
        slides={barbers}
        slide={Slide}
        title={title}
        buttonText={buttonText}
        keyValue="buttonLink"
      />
    </Section>
  );
};

export default OurBarbers;
