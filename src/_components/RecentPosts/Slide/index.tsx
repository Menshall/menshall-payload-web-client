import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { Post } from "@/payload-types";
import CustomImage from "@/_components/CustomImage";
import { Icon } from "@/_components/Icon";

const PostSlide = (post: Post) => {
  const { createdAt, title, slug, postImage } = post;
  const [day, month] = new Intl.DateTimeFormat("UK", {
    day: "2-digit",
    month: "long",
  })
    .format(new Date(createdAt))
    .split(" ");

  return (
    <Link prefetch={true} href={`/blog/${slug}`} className={styles.card}>
      <CustomImage media={postImage} loading="lazy" />
      <div className={styles.header}>
        <h2>{day}</h2>
        <h4>{month}</h4>
      </div>
      <div className={styles.description}>
        <h4>{title}</h4>
        <span className={styles.link}>
          Читати далі
          <Icon name="arrow-top" color="var(--primary-dark)" />
        </span>
      </div>
    </Link>
  );
};

export default PostSlide;
