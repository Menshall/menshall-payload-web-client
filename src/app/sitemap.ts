const BASE_URL = "https://www.menshall.com.ua";
const EXCLUDED_PAGES = ["schedule"];

import type { MetadataRoute } from "next";
import { getPages, getPosts } from "@/lib/enpoints";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const pages = await getPages();
  const postsEntity = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.createdAt,
    priority: 0.5,
    changeFrequency: "yearly",
  }));

  const pagesEntity = pages
    .filter((p) => EXCLUDED_PAGES.indexOf(p.slug!) === -1)
    .map((p) => {
      if (p.slug === "home") {
        return {
          url: `${BASE_URL}`,
          lastModified: p.createdAt,
          priority: 0.5,
          changeFrequency: "yearly",
        };
      }

      return {
        url: `${BASE_URL}/${p.slug}`,
        lastModified: p.createdAt,
        priority: 0.5,
        changeFrequency: "yearly",
      };
    });

  return [...pagesEntity, ...postsEntity] as MetadataRoute.Sitemap;
}
