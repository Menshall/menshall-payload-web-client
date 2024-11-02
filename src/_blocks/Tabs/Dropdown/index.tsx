import React from "react";
import classNames from "classnames";
import tabsStyles from "./styles.module.scss";
import { Icon } from "@/_components/Icon";

type Props = { tabs: any; onSelect: any; active: any };

const Dropdown = ({ tabs, onSelect, active }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const buttonId = React.useId();
  const { title } = tabs[active];

  const onSelectItem = (index: number) => {
    onSelect(index);
    setIsOpen(false);
  };

  return (
    <div className={tabsStyles.dropdown}>
      <button
        className={classNames(tabsStyles.button, tabsStyles.active)}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <span className={tabsStyles.buttonIcon}>
          <Icon name="arrow-short" height={18} width={18} />
        </span>
        <span className={tabsStyles.buttonInner}>{title}</span>
        <div
          className={classNames(
            tabsStyles.indicator,
            isOpen ? tabsStyles.indicatorActive : "",
          )}
        >
          <Icon name="chevron" height={24} width={24} />
        </div>
      </button>
      <span
        className={classNames(
          tabsStyles.dropdownContent,
          isOpen ? tabsStyles.opened : "",
        )}
        style={{
          height: isOpen ? `${(tabs.length - 1) * 36 + 12}px` : "12px",
        }}
      >
        <div>
          {tabs.map((tab: any, index: any) => {
            return (
              <button
                key={`${buttonId}${index}`}
                onClick={() => onSelectItem(index)}
                className={classNames(
                  tabsStyles.button,
                  active === index ? tabsStyles.hidden : "",
                  !isOpen ? tabsStyles.disabled : "",
                )}
              >
                <span className={tabsStyles.buttonInner}>{tab.title}</span>
              </button>
            );
          })}
        </div>
      </span>
    </div>
  );
};

export default Dropdown;
