import React from "react";
import classNames from "classnames";

interface TypographyProps {
  className?: string;
  size?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  style?: any;
}

const Typography = ({
  children,
  className,
  size = 4,
  ...props
}: TypographyProps) => {
  return (
    <p className={classNames(`p${size}`, className)} {...props}>
      {children}
    </p>
  );
};

export default Typography;
