import React from "react";

import List from "../List";
import TabsBlock from "../Tabs";
import Tiles from "../Tiles";

import classes from "./index.module.scss";
import RichText from "@/_components/RichText";
import CustomImage from "@/_components/CustomImage";
import classNames from "classnames";
import Section from "@/_components/Section";
import CTALink from "@/_components/CTA/CTALink";

// type Props = Extract<Page["layout"][0], { blockType: "content" }>;
type Props = any;

export const ContentBlock: React.FC<
  Props & {
    id?: string;
  }
> = (props) => {
  const { columns } = props;

  return (
    <Section>
      <div className={classes.grid}>
        {columns &&
          columns.length > 0 &&
          columns.map((col: any, index: any) => {
            const { size, blocks } = col;
            return (
              <div
                key={index}
                className={[classes.column, classes[`column--${size}`]].join(
                  " ",
                )}
              >
                {blocks.map((b: any) => {
                  if (b.blockType === "richText") {
                    return <RichText key={b.id} content={b.richText_html} />;
                  }
                  if (b.blockType === "tabs") {
                    return <TabsBlock key={b.id} {...b} />;
                  }
                  if (b.blockType === "link") {
                    return <CTALink key={b.id} link={b.newLink} />;
                  }

                  if (b.blockType === "list") {
                    return <List key={b.id} list={b.list} />;
                  }

                  if (b.blockType === "tiles") {
                    return (
                      <Tiles key={b.id} tiles={b.list} title={b.title} {...b} />
                    );
                  }

                  if (b.blockType === "mediaBlock" && b.media) {
                    return (
                      <div
                        key={b.id}
                        className={classNames(
                          classes.media,
                          // @ts-ignore
                          b.mobileHidden ? classes.mobileHidden : "",
                        )}
                      >
                        <CustomImage media={b.media} />
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
      </div>
    </Section>
  );
};
