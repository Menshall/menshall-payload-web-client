import React from "react";

import SelectableCard from "../../SelectableCard";

import generalStyles from "../../styles.module.scss";
import { useGeneralData } from "@/providers/general";
import { useScheduleStore } from "@/stores/schedule";
import Typography from "@/_components/Typography";

const Location = ({
  onSelectLocation,
}: {
  onSelectLocation: (location: string) => void;
}) => {
  const { contacts } = useGeneralData();
  const location = useScheduleStore((state) => state.selected.location);

  const {
    addressGroup: { addresses },
    workingHours,
  } = contacts;

  return (
    <div className={generalStyles.verticalCards}>
      {addresses.map(({ location: id, label, image, links }) => {
        return (
          <SelectableCard
            key={id}
            image={image}
            id={id}
            name="location"
            type="radio"
            checked={id === location}
            onChange={(e: any) => onSelectLocation(e.target.value)}
          >
            <div className={generalStyles.locationCard}>
              <Typography size={2}>{links[0].newLink?.label}</Typography>
              <Typography size={4}>{workingHours?.text}</Typography>
            </div>
          </SelectableCard>
        );
      })}
    </div>
  );
};

export default Location;
