import React from "react";
import { Metadata } from "next";
import Banner from "@/_components/Banner";
import ServicesSection from "@/_components/Services/ServicesSection";
import CustomerReviews from "@/_components/CustomerReviews";
import OurBarbers from "@/_components/OurBarbers";
import Contacts from "@/_components/Contacts";
import { Blocks } from "@/_components/Blocks";
import RecentPosts from "@/_components/RecentPosts";
import { generateMeta } from "@/_utilities/generateMeta";
import { getPage } from "@/lib/enpoints";

//                               12.4 kB         497 kB
// + First Load JS shared by all            88.1 kB
//   ├ chunks/7023-969202ab639ca081.js      31.5 kB
//   ├ chunks/fd9d1056-ae52f39498331e04.js  53.7 kB
//   └ other shared chunks (total)          2.91 kB

export default async function Page() {
  const page = await getPage("home");

  if (!page) {
    return <div>Error</div>;
  }

  return (
    <>
      <Banner page={page} title={page.title} video />
      <ServicesSection title="secondaryTitle" activeSlug={page.slug} />
      <CustomerReviews />
      <Blocks blocks={page.layout} />
      <OurBarbers />
      <RecentPosts />
      <Contacts />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  let page = null;
  try {
    page = await getPage("home", true);
  } catch (error) {
    // don't throw an error if the fetch fails
    // this is so that we can render static fallback pages for the demo
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // in production you may want to redirect to a 404  page or at least log the error somewhere
  }
  return generateMeta({ doc: page });
}