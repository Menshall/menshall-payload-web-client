import React from "react";

import Typography from "../../../../_components/Typography";
import SelectableCard from "../../SelectableCard";

import styles from "./styles.module.scss";
import general from "../../styles.module.scss";
import { useScheduleStore } from "@/stores/schedule";
import { useGeneralData } from "@/providers/general";
import StarRating from "@/_components/Rating";

const Master = ({
  onSelectMaster,
}: {
  onSelectMaster: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { barbersFormatted } = useGeneralData();
  const masters = useScheduleStore((state) => state.masters);
  const master = useScheduleStore((state) => state.selected.master);

  return (
    <div className={general.verticalCards}>
      {masters
        //@ts-ignore
        .sort((a, b) => b.bookable - a.bookable)
        .map((m) => (
          <SelectableCard
            key={m.id}
            image={barbersFormatted[m.id]?.image || m.avatar_big}
            name="location"
            type="radio"
            checked={m.id === master?.id}
            disabled={!m.bookable}
            id={m.id}
            onChange={onSelectMaster}
          >
            <div className={styles.inner}>
              <Typography size={2}>{m.name}</Typography>
              {m.rating > 1 && (
                <div className={styles.rate}>
                  <StarRating rating={Math.ceil(m.rating)} size={14} />
                  <span>{m.comments_count}</span>
                </div>
              )}
              <Typography size={4}>{m.specialization}</Typography>
            </div>
          </SelectableCard>
        ))}
    </div>
  );
};

export default Master;
