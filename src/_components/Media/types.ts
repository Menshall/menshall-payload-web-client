import type { ElementType, Ref } from "react";
import type { StaticImageData } from "next/image";
import { Media } from "@/payload-types";

export interface Props {
  src?: StaticImageData; // for static media
  alt?: string;
  resource?: string | Media; // for Payload media
  size?: string; // for NextImage only
  priority?: boolean; // for NextImage only
  fill?: boolean; // for NextImage only
  className?: string;
  imgClassName?: string;
  videoClassName?: string;
  htmlElement?: ElementType | null;
  onClick?: () => void;
  onLoad?: () => void;
  ref?: Ref<null | HTMLImageElement | HTMLVideoElement>;
}
