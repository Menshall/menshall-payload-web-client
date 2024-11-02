import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import styles from "./styles.module.scss";
import Banner from "@/_components/Banner";
import Section from "@/_components/Section";
import Typography from "@/_components/Typography";
import CustomImage from "@/_components/CustomImage";
import { Blocks } from "@/_components/Blocks";
import CustomerReviews from "@/_components/CustomerReviews";
import { generateMeta } from "@/_utilities/generateMeta";
import Social from "@/_components/Socials/Social";
import { getAcademyProgram, getAcademyTeachers, getPage } from "@/lib/enpoints";
import CTALink from "@/_components/CTA/CTALink";

export default async function Page() {
  const page = await getPage("academy");
  const academyTeachers = await getAcademyTeachers();
  const academyProgram = await getAcademyProgram();

  if (!page) {
    return notFound();
  }

  return (
    <>
      <Banner page={page} title={page.title} />
      <Section className={styles.programSection}>
        <div className={styles.programWrapper}>
          <div className={styles.programDesc}>
            <div className={styles.programHeader}>
              <h2>{academyProgram.title}</h2>
              <Typography size={2}>{academyProgram.description}</Typography>
            </div>
            <div className={styles.programItems}>
              {academyProgram.program.map(({ number, description }) => {
                return (
                  <div key={number}>
                    <h3>{number}</h3>
                    <Typography size={2}>{description}</Typography>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.programImage}>
            <CustomImage media={academyProgram.image as string} />
            <CTALink link={academyProgram.newLink} />
          </div>
        </div>
      </Section>
      <Blocks blocks={page.layout} disableTopPadding />
      <CustomerReviews />
      <Section heading={academyTeachers.title}>
        <div className={styles.masters}>
          {academyTeachers.teachers.map(
            ({ name, description, text, image, socials }) => {
              return (
                <div className={styles.master} key={name}>
                  <Typography size={2}>{text}</Typography>
                  <div>
                    <CustomImage media={image as string} />
                    <div className={styles.masterDetails}>
                      <div className={styles.masterHeader}>
                        <h3>{name}</h3>
                        {socials?.socials?.map((s) => (
                          <Social
                            name={s.name}
                            newLink={s.newLink}
                            key={s.id}
                          />
                        ))}
                      </div>
                      <Typography size={2}>{description}</Typography>
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </Section>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  let page = null;
  try {
    page = await getPage("academy", true);
  } catch (error) {
    // don't throw an error if the fetch fails
    // this is so that we can render static fallback pages for the demo
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // in production you may want to redirect to a 404  page or at least log the error somewhere
  }
  return generateMeta({ doc: page });
}
