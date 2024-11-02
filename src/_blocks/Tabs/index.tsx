"use client";
import React from "react";
import classNames from "classnames";

import RichText from "../../_components/RichText";
import Typography from "../../_components/Typography";
import useWindowSize from "@/hooks/useWindowSize";
import Dropdown from "./Dropdown";

import tabsStyles from "./tabstyles.module.scss";
import CustomImage from "@/_components/CustomImage";
import { Icon } from "@/_components/Icon";

// type Props = Extract<Page["layout"], { blockType: "tabs" }>;
type Props1 = any;

const TabsBlock = (props: Props1) => {
  const { list, secondLabel, thirdLabel } = props;
  const [active, setActive] = React.useState(0);
  const { windowWidth } = useWindowSize();
  const onClick = (index: number) => {
    setActive(index);
  };

  const tab = React.useMemo(() => {
    return list[active];
  }, [active, list]);

  return (
    <>
      <div className={tabsStyles.tabs}>
        {windowWidth > 767 ? (
          <Buttons active={active} onClick={onClick} tabs={list} />
        ) : (
          <Dropdown active={active} onSelect={onClick} tabs={list} />
        )}

        <div className={tabsStyles.content}>
          <h3>{tab.title}</h3>
          <div className={tabsStyles.description}>
            <div className={tabsStyles.subs}>
              <div className={tabsStyles.sub}>
                <span>{secondLabel}</span>
                <Typography size={2}>{tab.price}</Typography>
              </div>
              <div className={tabsStyles.sub}>
                <span>{thirdLabel}</span>
                <Typography size={2}>{tab.duration}</Typography>
              </div>
            </div>
            <div className={tabsStyles.text}>
              <RichText content={tab.tabsRichText_html}></RichText>
            </div>
          </div>
          {tab.image && (
            <div className={tabsStyles.image}>
              <CustomImage media={tab.image} width={100} height={330} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TabsBlock;

// @ts-ignore
const Buttons = ({ tabs, onClick, active }) => {
  const buttonId = React.useId();
  return (
    <div className={tabsStyles.buttons}>
      {tabs.map((tab: any, index: any) => {
        return (
          <button
            key={`${buttonId}${index}`}
            onClick={() => onClick(index)}
            className={classNames(
              tabsStyles.button,
              active === index ? tabsStyles.active : "",
            )}
          >
            <span>
              <Icon name="arrow-short" height={18} width={18} />
            </span>
            {tab.title}
          </button>
        );
      })}
    </div>
  );
};
