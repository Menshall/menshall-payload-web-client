//@ts-nocheck
import type { Metadata } from "next";

import { mergeOpenGraph } from "./mergeOpenGraph";
import { Page, Post } from "@/payload-types";
import { getMediaById } from "@/lib/enpoints";

const defaultMeta = {
  title: "Men's Hall",
  description: "Men's Hall",
};

export const generateMeta = async (args: {
  doc: Page | Post | null;
  media?: string;
}): Promise<Metadata> => {
  const { doc } = args || {};

  if (doc === null) {
    return defaultMeta;
  }

  const imgId = doc.meta.image || doc.banner?.media || doc.postImage;

  let img = imgId ? await getMediaById(imgId) : false;

  return {
    title: doc?.meta?.title || defaultMeta.title,
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      title: doc?.meta?.title || defaultMeta.title,
      description: doc?.meta?.description || defaultMeta.description,
      url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : "/",
      images: [
        {
          url:
            img !== false && img?._key
              ? `https://utfs.io/f/${img?._key}`
              : "https://maslovskyy.kyiv.ua/favicon.png",
        },
      ],
    }),
  };
};
