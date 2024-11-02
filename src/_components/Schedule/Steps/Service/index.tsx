import React from "react";

import { TableRow } from "@/_blocks/Table";
import { timing } from "@/_utilities/formatters";

import styles from "./styles.module.scss";
import { useScheduleStore } from "@/stores/schedule";
import { Icon } from "@/_components/Icon";
import Typography from "@/_components/Typography";
import { Services } from "../../../../../app-types";
import classNames from "classnames";

const Service = ({
  onSelectService,
}: {
  onSelectService: (services: Services) => void;
}) => {
  const selectedServices = useScheduleStore((state) => state.selected.services);
  const services = useScheduleStore((state) => state.services);
  const selectedCategories = useScheduleStore(
    (state) => state.selected.categories,
  );

  const handleSelectService = (e: any) => {
    if (e.target.checked) {
      const selectedService = services
        .map((s) => s.services)
        .flat(1)
        .find(({ id }) => String(id) === e.target.value);

      if (selectedService) {
        onSelectService([...selectedServices, selectedService]);
      }
    } else {
      const selectedService = selectedServices.filter(
        (s) => String(s.id) !== e.target.value,
      );
      onSelectService(selectedService);
    }
  };

  const isChecked = (id: number) => {
    return !!selectedServices.find((service) => service.id === id);
  };

  const getPrice = (price_max: number, price_min: number) => {
    if (price_min === 0) {
      return price_max;
    }

    if (price_max === 0) {
      return price_min;
    }
    return price_max === price_min ? price_max : `${price_min} - ${price_max}`;
  };

  const checkIsDisabled = (catId: number): boolean => {
    const manikCategory = 10897149;

    if (selectedCategories.length === 0) {
      return false;
    }

    if (
      !selectedCategories.includes(manikCategory) &&
      catId === manikCategory
    ) {
      return true;
    }

    if (selectedCategories.includes(manikCategory) && catId !== manikCategory) {
      return true;
    }

    return false;
  };

  return services.map((s, index) => {
    return (
      <div key={s.title}>
        <Typography
          className={classNames(
            styles.title,
            index === 0 ? styles.titleFirst : "",
          )}
          size={1}
        >
          {s.title}
        </Typography>
        <div className={styles.cards}>
          {s.services.map(
            ({
              id,
              title,
              price_max,
              price_min,
              seance_length,
              comment,
              category_id,
            }) => {
              const disabled = checkIsDisabled(category_id);
              return (
                <div
                  key={id}
                  className={classNames(
                    styles.card,
                    disabled ? styles.disabled : "",
                  )}
                >
                  <input
                    type="checkbox"
                    id={String(id)}
                    name="service"
                    onChange={handleSelectService}
                    value={id}
                    checked={isChecked(id)}
                    disabled={disabled}
                  />
                  <span>
                    <Icon name="check" width={24} height={24} />
                  </span>
                  <label htmlFor={String(id)}>
                    <TableRow
                      leftTableCol="Вартість:"
                      rightTableCol="Тривалість: "
                      service={title}
                      duration={timing(seance_length)}
                      description={comment}
                      price={getPrice(price_max, price_min)}
                    />
                  </label>
                </div>
              );
            },
          )}
        </div>
      </div>
    );
  });
};

export default Service;
