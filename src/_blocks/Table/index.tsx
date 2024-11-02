import React from "react";

import Typography from "../../_components/Typography";
import ShowMore from "./ShowMore";

import styles from "./styles.module.scss";
import Section from "@/_components/Section";

type Props = any;
// type Props = Extract<Page["layout"], { blockType: "tables" }>;

export const TableBlock: React.FC<Props> = ({ general, list }) => {
  return (
    <Section heading={general?.title}>
      <div className={styles.tables}>
        {list?.map(({ table, id }: { table: any; id: any }) => {
          return (
            <div key={id} className={styles.tableWrapper}>
              <h3>{table?.title}</h3>
              <div className={styles.table}>
                {table?.rows?.map(({ row, id }: { row: any; id: any }) => (
                  <TableRow
                    key={id}
                    leftTableCol={general?.secondColumnLabel}
                    rightTableCol={general?.thirdColumnLabel}
                    // @ts-ignore
                    description={row?.description}
                    price={row?.price}
                    // @ts-ignore
                    duration={row?.duration}
                    service={row?.title}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default TableBlock;

export const TableRow = ({
  // @ts-ignore
  leftTableCol,
  // @ts-ignore
  rightTableCol,
  // @ts-ignore
  service,
  // @ts-ignore
  price,
  description = "",
  duration = "",
}) => {
  return (
    <div className={styles.row} key={service}>
      <div className={styles.cell}>
        <Typography className={styles.service} size={2}>
          {service}
        </Typography>
        <ShowMore description={description} />
      </div>
      {!!price && (
        <div className={styles.cell}>
          <h6>{leftTableCol}</h6>
          <Typography size={2} className={styles.service}>
            {`${price}₴`}
          </Typography>
        </div>
      )}
      {!!duration && (
        <div className={styles.cell}>
          <h6>{rightTableCol}</h6>
          <Typography size={2} className={styles.service}>
            {duration}
          </Typography>
        </div>
      )}
    </div>
  );
};
