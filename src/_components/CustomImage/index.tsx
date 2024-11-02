"use client";

import React from "react";
import { Media } from "@/payload-types";
import Image from "next/image";
import { useGeneralData } from "@/providers/general";

type NativeImageProps = React.ComponentPropsWithoutRef<"img"> & {
  className?: string;
  media?: Media | string;
  fill?: boolean;
};

const CustomImage = (props: NativeImageProps) => {
  const { media, loading, ...htmlProps } = props;
  const { media: data } = useGeneralData();
  const image = data.find((i) => i._id === media);
  let fill = props.fill;

  if (typeof media === "string" && media.startsWith("http")) {
    const width = htmlProps.width || image?.width!;
    const height = htmlProps.height || image?.height!;

    if (!width && !height) {
      fill = true;
    }

    return (
      <Image
        src={media}
        alt={"alt"}
        fill={fill}
        width={!fill ? Number(width) : undefined}
        height={!fill ? Number(height) : undefined}
      />
    );
  }

  if (!image) {
    return <></>;
  }

  const width = Number(htmlProps.width || image?.width!);
  const height = Number(htmlProps.height || image?.height!);
  return (
    <Image
      className={props.className}
      alt={"alt"}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      src={`https://utfs.io/f/${image?._key}`}
      // src={`https://storage.googleapis.com/menshall-media/${image?.filename}`}
      // src={`https://ryfl1djfrijdesdy.public.blob.vercel-storage.com/${image?.filename}`}
      loading={loading || "lazy"}
      quality={100}
    />
  );

  // if (media) {
  //   // const mediaFile = await fetch(
  //   //   `http://localhost:3000/api/media?id=${media}`,
  //   //   { cache: "no-cache" },
  //   //   // {
  //   //   //   next: { revalidate: 1800 },
  //   //   // },
  //   // )
  //   //   .then((res) => res.json())
  //   //   .then((data) => data);
  //
  //   // console.log({ mediaFile });
  //
  //   return (
  //     // <img
  //     //   className={props.className}
  //     //   alt={media?.alt!}
  //     //   width={media?.width!}
  //     //   height={media?.height!}
  //     //   src={`/${media?.filename}`}
  //     //   loading={loading || "lazy"}
  //     //   {...htmlProps}
  //     // />
  //     <Image
  //       {/*{...rest}*/}
  //       className={props.className}
  //       alt={media?.alt!}
  //       fill={fill}
  //       width={media?.width!}
  //       height={media?.height!}
  //       {/*{...(fill*/}
  //       {/*  ? { fill }*/}
  //       {/*  : {*/}
  //       {/*      width: media?.width!,*/}
  //       {/*      height: media?.height!,*/}
  //       {/*    })}*/}
  //       // https://maslovskyy.kyiv.ua/${mediaFile.filename}
  //       src={`https://maslovskyy.kyiv.ua/${media?.filename}`}
  //       loading={loading || "lazy"}
  //     />
  //   );
  // }
  // return (
  //   <img
  //     className={props.className}
  //     alt="alt"
  //     loading={loading || "lazy"}
  //     width={width}
  //     height={height}
  //     {...htmlProps}
  //     src={props.src?.includes("http") ? props.src : `/${props.src}`}
  //   />
  // );
};

export default CustomImage;
