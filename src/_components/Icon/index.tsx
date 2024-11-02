import { type SVGProps } from "react";
import { IconName } from "../../../types/name";

export type { IconName };

const svgVersion = "v1.0.2";

export function Icon({
  name,
  childClassName,
  className,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
  childClassName?: string;
}) {
  return (
    <svg {...props} className={className}>
      <use href={`../../../icons/sprite.svg?version=${svgVersion}#${name}`} />
    </svg>
  );
}
