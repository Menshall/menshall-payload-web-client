import React from "react";

import RichText from "../../_components/RichText";

import styles from "./styles.module.scss";

const List = ({ list }: { list: any }) => {
  return (
    <div className={styles.stages}>
      <div className={styles.stageContent}>
        {list.map(
          ({
            title,
            listRichText_html,
          }: {
            title: string;
            listRichText_html: string;
          }) => {
            return (
              <div className={styles.stage} key={title}>
                <h4>{title}</h4>
                <RichText content={listRichText_html} />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default List;
