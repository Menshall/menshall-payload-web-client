"use client";

import React from "react";
import ReactPlayer from "react-player";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { useGeneralData } from "@/providers/general";
import { Media } from "@/payload-types";

const VideoPlayer = ({ media }: { media?: Media | string }) => {
  const { media: data } = useGeneralData();
  const video = data.find((i) => i._id === media);

  if (!video) {
    return <div>No Video</div>;
  }

  return (
    <ReactPlayer
      url={`https://utfs.io/f/${video?._key}`}
      // url="https://www.youtube.com/embed/PlLlDRkCqlQ?playlist=PlLlDRkCqlQ&&controls=0&allowFullScreen=1&disablekb=1&fs=0&iv_load_policy=3&loop=1&playsinline=1&start=0&autoplay=1"
      playsinline
      loop
      muted
      playing
      controls={false}
      height="100%"
      width="100%"
      wrapper={({ children }) => (
        <div className={classNames(styles.bgVideo, "grid-content-full")}>
          {children}
        </div>
      )}
    />
  );
};

export default VideoPlayer;
