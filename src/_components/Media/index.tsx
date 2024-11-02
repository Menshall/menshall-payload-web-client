import React from "react";

import { Props } from "./types";
import CustomImage from "@/_components/CustomImage";

export const Media: React.FC<Props> = (props) => {
  const { resource } = props;
  return <CustomImage media={resource} />;
};
