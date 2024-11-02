import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import classNames from "classnames";
import Typography from "@/_components/Typography";
import { Post } from "@/payload-types";
import CustomImage from "@/_components/CustomImage";
import { Icon } from "@/_components/Icon";

const BlogAside = ({
  title,
  className,
  posts,
}: {
  title: string;
  className: string;
  posts: Array<Post>;
}) => {
  const formattedDate = (date: string) =>
    new Intl.DateTimeFormat("UK", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
      .format(new Date(date))
      .replace("р.", "");

  return (
    <aside className={classNames(styles.aside, className)}>
      <h3>{title}</h3>
      {posts.length > 0 && (
        <div className={styles.list}>
          {posts.map(({ slug, postImage, createdAt, title }) => {
            return (
              <Link
                prefetch={true}
                href={`/blog/${slug}`}
                key={slug}
                className={styles.post}
              >
                <div className={styles.img}>
                  <CustomImage media={postImage} width={87} height={80} />
                </div>
                <div className={styles.desc}>
                  <Typography size={3} className={styles.title}>
                    {title}
                  </Typography>
                  <Typography size={4}>
                    <Icon
                      name="calendar"
                      width={14}
                      height={14}
                      color="var(--primary-dark)"
                    />
                    {formattedDate(createdAt)}
                  </Typography>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </aside>
  );
};

export default BlogAside;
