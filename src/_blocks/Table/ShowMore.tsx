"use client";
import React from "react";
import ShowMoreText from "react-show-more-text";

const ShowMore = ({ description }: { description: string }) => {
  return (
    <ShowMoreText
      lines={2}
      more="Показати ще"
      less="Сховати"
      className="p3 b-100"
      anchorClass="show-more-less-clickable"
      expanded={false}
      truncatedEndingComponent={"... "}
    >
      {description}
    </ShowMoreText>
  );
};

export default ShowMore;
