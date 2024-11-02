import React, { Fragment } from "react";

import { ContentBlock } from "@/_blocks/Content";
import { MediaBlock } from "@/_blocks/MediaBlock";
import TableBlock from "@/_blocks/Table";
import TabsBlock from "@/_blocks/Tabs";
import { toKebabCase } from "@/_utilities/toKebabCase";
import { Page } from "@/payload-types";

const blockComponents = {
  content: ContentBlock,
  mediaBlock: MediaBlock,
  tables: TableBlock,
  tabs: TabsBlock,
};

export const Blocks: React.FC<{
  blocks: Page["layout"];
  disableTopPadding?: boolean;
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;
  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block) => {
          const { blockName, blockType } = block;
          if (blockType && blockType in blockComponents) {
            // @ts-ignore
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <Block
                  key={toKebabCase(blockName as string)}
                  id={toKebabCase(blockName as string)}
                  {...block}
                />
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
