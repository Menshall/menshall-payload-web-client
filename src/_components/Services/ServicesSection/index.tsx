"use client";

import React from "react";
import Services from "@/_components/Services";
import { useGeneralData } from "@/providers/general";
import Section from "@/_components/Section";

type ServicesSectionProps = {
  title: "title" | "secondaryTitle" | "thirdTitle";
  activeSlug?: string | null;
};

const ServicesSection = (props: ServicesSectionProps) => {
  const { services } = useGeneralData();
  return (
    <Section heading={services[props.title]}>
      <Services services={services} activeSlug={props.activeSlug} />
    </Section>
  );
};

export default ServicesSection;
