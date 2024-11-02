import React from "react";
import { Metadata } from "next";

import styles from "../styles.module.scss";
import BlogAside from "@/_components/BlogAside";
import classNames from "classnames";
import Breadcrumb from "@/_components/Breadcrumb";
import Typography from "@/_components/Typography";
import { Blocks } from "@/_components/Blocks";
import { generateMeta } from "@/_utilities/generateMeta";
import CustomImage from "@/_components/CustomImage";
import { getPost, getPostsById } from "@/lib/enpoints";
import Section from "@/_components/Section";
import { Icon } from "@/_components/Icon";
import dynamic from "next/dynamic";

const ServicesSection = dynamic(
  () => import("../../../../_components/Services/ServicesSection"),
  {
    ssr: false,
  },
);

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post || !post.slug) {
    return <div>No Post Found</div>;
  }

  const formattedDate = post.createdAt
    ? new Intl.DateTimeFormat("UK", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
        .format(new Date(post.createdAt))
        .replace("р.", "")
    : "";

  const related = await getPostsById(post.relatedPosts as Array<string>);

  return (
    <>
      <Section className={classNames(styles.section, styles.singleSection)}>
        <div className={styles.inner}>
          <div className={styles.single}>
            <div className={styles.header}>
              <Breadcrumb
                breadcrumbs={[
                  {
                    label: "Головна",
                    link: "/",
                  },
                  {
                    label: "Блог",
                    link: "/blog",
                  },
                  {
                    label: `${post.title.substring(0, 20)}...`,
                    link: post.slug,
                  },
                ]}
              />
              <h3>{post?.title}</h3>
              <div className={styles.date}>
                <Typography size={4}>
                  <Icon
                    name="calendar"
                    width={14}
                    height={14}
                    color="var(--primary-dark)"
                  />
                  {formattedDate}
                </Typography>
              </div>
            </div>
            <CustomImage media={post.postImage} />
            <Blocks blocks={post.layout} disableTopPadding />
          </div>
          <BlogAside
            title="Інші Статті"
            className={styles.aside}
            posts={related}
          />
        </div>
      </Section>
      <ServicesSection activeSlug={params.slug} title="secondaryTitle" />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  let post = null;
  try {
    post = await getPost(params.slug, true);
  } catch (error) {
    // don't throw an error if the fetch fails
    // this is so that we can render static fallback pages for the demo
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // in production you may want to redirect to a 404  page or at least log the error somewhere
  }

  return generateMeta({ doc: post });
}
