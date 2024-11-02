"use client";
import React from "react";

import classes from "./index.module.scss";

const RichText: React.FC<{ className?: string; content: any }> = ({
  className,
  content,
}) => {
  if (!content) {
    return null;
  }

  return (
    <div
      className={[classes.richText, className, "richText"]
        .filter(Boolean)
        .join(" ")}
    >
      <span dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default RichText;
