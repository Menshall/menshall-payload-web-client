import React from "react";

import styles from "./styles.module.scss";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useGeneralData } from "@/providers/general";
import { useScheduleStore } from "@/stores/schedule";
import { PrimaryButton } from "@/_components/CTA/Buttons/PrimaryButton";
import { TertiaryButton } from "@/_components/CTA/Buttons/TertiaryButton";
import { PrimaryLink } from "@/_components/CTA/Links/PrimaryLink";

const Footer = ({
  onSubmit,
  isValid,
}: {
  isValid: boolean;
  onSubmit: () => void;
}) => {
  const { schedule } = useGeneralData();
  const router = useRouter();

  const { flow, services } = useScheduleStore((state) => state.selected);
  const { reschedule, next, prev } = useScheduleStore((state) => state.actions);

  const isReschedule = useScheduleStore((state) => state.isReschedule);
  const currentStep = useScheduleStore((state) => state.currentStep);
  const loading = useScheduleStore((state) => state.loading);
  const error = useScheduleStore((state) => state.error);

  const showNext =
    (flow === "master" && currentStep === 4) ||
    (flow === "service" && currentStep === 3);

  const showPrev = isReschedule
    ? currentStep > 5 && currentStep < 8
    : currentStep < 8;

  const isDisabledNext =
    (flow === "master" && services.length === 0) ||
    (flow === "service" && services.length === 0);

  return (
    <footer
      className={classNames(
        styles.footerContainer,
        "grid-content-full grid-container",
      )}
    >
      <div className={classNames(styles.footer, "grid-content")}>
        {currentStep === 8 && <PrimaryLink href="/">На головну</PrimaryLink>}
        {showPrev && (
          <TertiaryButton iconPosition="left" key="prev" onClick={prev}>
            {schedule.prevButtonText}
          </TertiaryButton>
        )}
        {showNext && (
          <PrimaryButton
            key="next"
            onClick={next}
            disabled={isDisabledNext || !!error || loading}
            loading={loading}
            type="submit"
          >
            {schedule.nextButtonText}
          </PrimaryButton>
        )}
        {currentStep === 7 && !isReschedule && (
          <PrimaryButton
            onClick={onSubmit}
            disabled={!isValid || loading}
            loading={loading}
          >
            {schedule.submitButtonText}
          </PrimaryButton>
        )}
        {currentStep === 7 && isReschedule && (
          <PrimaryButton
            onClick={() =>
              reschedule(() => router.push("/user-account/visits"))
            }
            disabled={loading}
            loading={loading}
          >
            Підвердити
          </PrimaryButton>
        )}
      </div>
    </footer>
  );
};

export default Footer;
