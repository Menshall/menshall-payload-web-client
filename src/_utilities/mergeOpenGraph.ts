import type { Metadata } from "next";

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  siteName: "Men's Hall",
  title: "Men's Hall",
  description: "Men's Hall",
  images: [
    {
      url: "https://menshall-vercel.vercel.app/api/media/file/Logo.svg",
    },
  ],
};

export const mergeOpenGraph = (
  og?: Metadata["openGraph"]
): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
