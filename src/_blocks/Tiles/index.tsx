import React from "react";

import RichText from "../../_components/RichText";

import styles from "./styles.module.scss";
import CustomImage from "@/_components/CustomImage";

type Props = {
  title: any;
  tableRichText_html: any;
  image: any;
};

const Tiles = ({ tiles, title }: { tiles: any; title: any }) => {
  return (
    <div className={styles.wrapper}>
      <h2>{title}</h2>
      <div className={styles.advantages}>
        {tiles.map(({ title, tableRichText_html, image }: Props) => (
          <div className={styles.adv} key={title}>
            <div className={styles.icon}>
              <CustomImage media={image} />
            </div>
            <div className={styles.desc}>
              <h5>{title}</h5>
              <RichText content={tableRichText_html} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tiles;
