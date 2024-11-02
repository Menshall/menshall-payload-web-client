import React from "react";
import { notFound } from "next/navigation";

import Banner from "@/_components/Banner";
import Contacts from "@/_components/Contacts";
import { Metadata } from "next";
import { generateMeta } from "@/_utilities/generateMeta";
import ServicesSection from "@/_components/Services/ServicesSection";
import { getPage } from "@/lib/enpoints";

export default async function Page() {
  const page = await getPage("contacts");

  if (!page) {
    return notFound();
  }

  return (
    <>
      <Banner page={page} title={page.title} />
      <Contacts />
      <ServicesSection title="secondaryTitle" activeSlug={page.slug} />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  let page = null;
  try {
    page = await getPage("contacts", true);
  } catch (error) {
    // don't throw an error if the fetch fails
    // this is so that we can render static fallback pages for the demo
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // in production you may want to redirect to a 404  page or at least log the error somewhere
  }
  return generateMeta({ doc: page });
}
