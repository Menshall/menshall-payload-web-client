"use client";
import React from "react";
import { StaticImageData } from "next/image";

import { Media } from "../../_components/Media";

import classes from "./index.module.scss";
import { Page } from "@/payload-types";

type Props = Extract<Page["layout"], { blockType: "mediaBlock" }> & {
  staticImage?: StaticImageData;
  id?: string;
};

export const MediaBlock: React.FC<Props> = (props) => {
  const { media, staticImage } = props;
  return (
    <div className={classes.mediaBlock}>
      <Media resource={media} src={staticImage} />
    </div>
  );
};
