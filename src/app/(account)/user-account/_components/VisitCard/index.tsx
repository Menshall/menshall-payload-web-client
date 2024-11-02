import React from "react";
import { Visit } from "@/app-types";
import {
  getDayMonthWeekday,
  getHourMinutes,
  timing,
} from "@/_utilities/formatters";
import styles from "./styles.module.scss";
import { Contact } from "@/payload-types";
import Typography from "@/_components/Typography";
import CustomImage from "@/_components/CustomImage";
import { useRouter } from "next/navigation";
import { useGeneralData } from "@/providers/general";
import { useScheduleStore } from "@/stores/schedule";
import { Icon } from "@/_components/Icon";
import { PrimaryButton } from "@/_components/CTA/Buttons/PrimaryButton";
import { TertiaryButton } from "@/_components/CTA/Buttons/TertiaryButton";

const getCalendarLink = (
  service: string,
  location: string,
  dates: string,
  details: string,
) =>
  `https://calendar.google.com/calendar/u/0/r/eventedit?text=${service}&dates=${dates}&details=${details}&location=${location}`;

const VisitCard = ({
  visit,
  contacts,
  isFuture,
}: {
  visit: Visit;
  contacts: Contact;
  isFuture: boolean;
}) => {
  const { barbersFormatted } = useGeneralData();
  const onRepeat = useScheduleStore((state) => state.actions.onRepeat);
  const onReschedule = useScheduleStore((state) => state.actions.onReschedule);
  const router = useRouter();

  const totalPrice = visit.services.reduce(
    (acc, curr) => acc + curr.price_max,
    0,
  );

  const addresses = contacts.addressGroup.addresses.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.location]: curr.links[0].newLink?.label,
    };
  }, {});

  const service = `${visit.services
    .map((s) => s.title)
    .join(", ")} - ${totalPrice} ₴`;

  const seanceLength = visit.services.reduce(
    (acc, curr) => acc + curr.seance_length,
    0,
  );

  const visitDate = new Date(visit.date);

  const endDate = new Date(visitDate.getTime() + seanceLength * 1000);

  const { day, weekday, month, hourMinutes } = getDayMonthWeekday(visitDate);
  const endHourMinutes = getHourMinutes(endDate);

  // @ts-ignore
  const address = addresses[visit.company.id] as string;

  const dateTimeString = `${hourMinutes} - ${endHourMinutes} ( ${timing(
    (endDate.getTime() - visitDate.getTime()) / 1000,
  )} )`;

  const onRepeatVisit = () => {
    onRepeat(visit);
    router.replace("/user-account/visits/repeat");
  };

  const onRescheduleVisit = () => {
    onReschedule(visit);
    router.replace("/user-account/visits/reschedule");
  };

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.date}>
          <h4>{weekday}</h4>
          <h2>{day}</h2>
          <Typography size={3}>{month}</Typography>
        </div>
        <div className={styles.main}>
          <Typography size={2}>
            <Icon name="time" width={20} height={20} />
            {dateTimeString}
          </Typography>
          <Typography size={2}>
            <Icon name="location" width={20} height={20} />
            {address}
          </Typography>
          <Typography size={2}>
            <Icon name="price" width={20} height={20} />
            {service}
          </Typography>
        </div>
        {visit.deleted && (
          <div className={styles.future}>
            <Typography size={4} className={styles.canceled}>
              Скасовано
            </Typography>
          </div>
        )}
        {isFuture && (
          <div className={styles.future}>
            {visit.allow_change_record && (
              <TertiaryButton onClick={onRescheduleVisit}>
                <Icon name="membership" />
                <Typography size={4}>Перенести</Typography>
              </TertiaryButton>
            )}

            <TertiaryButton
              onClick={() =>
                router.push(
                  getCalendarLink(
                    `${service}, ${visit.staff.name}`,
                    address,
                    `${visitDate
                      .toISOString()
                      .split(".")[0]
                      .replace(/-|:|[.]/g, "")}Z/${endDate
                      .toISOString()
                      .split(".")[0]
                      .replace(/-|:|[.]/g, "")}Z`,
                    `${address}`,
                  ),
                  {},
                )
              }
            >
              <Icon name="calendar-add" />
              <Typography size={4}>Додати в Календар</Typography>
            </TertiaryButton>

            {visit.allow_delete_record && (
              <TertiaryButton
                onClick={() =>
                  router.push(`/user-account/visits?cancelId=${visit.id}`)
                }
              >
                <Icon name="close" width={24} height={24} />{" "}
                <Typography size={4}>Скасувати</Typography>
              </TertiaryButton>
            )}
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        {barbersFormatted[visit.staff.id] && (
          <div className={styles.barberImage}>
            <CustomImage
              media={barbersFormatted[visit.staff.id].image}
              width={72}
              height={72}
            />
          </div>
        )}
        <div className={styles.barber}>
          <h4>{visit.staff.name}</h4>
          <Typography size={3}>{visit.staff.specialization}</Typography>
        </div>
      </div>
      {!isFuture && !visit.staff.is_deleted && !visit.deleted && (
        <div className={styles.past}>
          <PrimaryButton onClick={onRepeatVisit}>Повторити</PrimaryButton>
          {visit.review_enabled && (
            <TertiaryButton
              onClick={() =>
                router.replace(`/user-account/visits?feedbackId=${visit.id}`)
              }
            >
              Залишити Відгук
            </TertiaryButton>
          )}
        </div>
      )}
    </div>
  );
};

export default VisitCard;
