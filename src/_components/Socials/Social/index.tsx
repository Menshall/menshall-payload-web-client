import React from "react";
import { Icon, IconName } from "@/_components/Icon";
import CTALink from "@/_components/CTA/CTALink";

const Social = ({ name, newLink }: { name: string; newLink: any }) => {
  return (
    <CTALink key={name} link={newLink}>
      <Icon name={name as IconName} width={24} height={24} />
    </CTALink>
  );
};

export default Social;
