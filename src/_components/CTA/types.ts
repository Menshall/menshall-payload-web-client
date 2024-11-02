import { Header } from "@/payload-types";
import { LinkProps } from "next/link";
import React, { ComponentPropsWithoutRef } from "react";

export type CTALinkPropsGeneral = {
  link: Header["newLink"];
  iconPosition?: "left" | "right";
  className?: string;
  children?: React.ReactNode;
};

export type CTALinkProps = LinkProps & {
  children: React.ReactNode;
  target?: string;
  rel?: string;
  className?: string;
};

export type CTAButtonProps = ComponentPropsWithoutRef<"button"> & {
  iconPosition?: "left" | "right";
  loading?: boolean;
};
