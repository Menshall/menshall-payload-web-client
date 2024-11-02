import React from "react";
import { Metadata } from "next";

import styles from "./styles.module.scss";
import PostSlide from "@/_components/RecentPosts/Slide";
import BlogAside from "@/_components/BlogAside";
import Banner from "@/_components/Banner";
import { generateMeta } from "@/_utilities/generateMeta";
import { notFound } from "next/navigation";
import { getPage, getPosts, getPostsByCategoryId } from "@/lib/enpoints";
import Section from "@/_components/Section";
import dynamic from "next/dynamic";

const ServicesSection = dynamic(
  () => import("../../../_components/Services/ServicesSection"),
  {
    ssr: false,
  },
);

const PER_PAGE = 7;

export default async function Page() {
  const page = await getPage("blog");

  const posts = await getPosts();

  if (!page) {
    return notFound();
  }

  const popular = await getPostsByCategoryId("666d8c5550f0d84256a7b02d");

  return (
    <>
      <Banner page={page} title={page.title} />
      <Section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.posts}>
            <div className={styles.restPosts}>
              {posts.map(({ id, ...post }) => (
                <PostSlide key={id} id={id} {...post} />
              ))}
            </div>
            {posts.length > PER_PAGE && (
              <div className={styles.pagination}>
                {/*<button onClick={onPrev} disabled={currentPage === 0}>*/}
                {/*  <ChevronIcon />*/}
                {/*</button>*/}
                {/*{posts.docs.map((_, index) => {*/}
                {/*  return (*/}
                {/*    <button*/}
                {/*      key={index}*/}
                {/*      className={currentPage === index ? styles.active : ""}*/}
                {/*      onClick={() => onClickPage(index)}*/}
                {/*    >*/}
                {/*      {index + 1}*/}
                {/*    </button>*/}
                {/*  );*/}
                {/*})}*/}
                {/*<button*/}
                {/*  onClick={onNext}*/}
                {/*  disabled={currentPage + 1 === posts.docs.length}*/}
                {/*>*/}
                {/*  <ChevronIcon />*/}
                {/*</button>*/}
              </div>
            )}
          </div>
          <BlogAside
            title={"Інші Статті"}
            className={styles.aside}
            posts={popular}
          />
        </div>
      </Section>
      <ServicesSection title="secondaryTitle" activeSlug={page.slug} />
    </>
  );
}

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts?.map(({ slug }) => slug);
  } catch (error) {
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  let page = null;
  try {
    page = await getPage("blog", true);
  } catch (error) {
    // don't throw an error if the fetch fails
    // this is so that we can render static fallback pages for the demo
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // in production you may want to redirect to a 404  page or at least log the error somewhere
  }
  return generateMeta({ doc: page });
}
