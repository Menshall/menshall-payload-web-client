"use client";
import React from "react";
import Flow from "@/_components/Schedule/Flow";
import { useScheduleStore } from "@/stores/schedule";
import { SubmitScheduleProps } from "@/stores/schedule/types";
import Footer from "@/_components/Schedule/Footer";
import styles from "./styles.module.scss";
import classNames from "classnames";
import Spinner from "@/_components/Spinner";
import Summary from "@/_components/Schedule/Summary";
import ModalError from "@/_components/Schedule/ErrorModal";
import Title from "@/_components/Schedule/Title";

const Schedule = ({ hideSummary }: { hideSummary?: boolean }) => {
  const flow = useScheduleStore((state) => state.selected.flow);
  const currentStep = useScheduleStore((state) => state.currentStep);
  const formData = useScheduleStore((state) => state.formData);
  const repeatLoading = useScheduleStore((state) => state.repeatLoading);
  const submit = useScheduleStore((state) => state.actions.submit);
  const error = useScheduleStore((state) => state.error);
  const resetStore = useScheduleStore((state) => state.actions.resetStore);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    return () => {
      resetStore();
    };
  }, []);

  const onSubmit = async () => {
    if (formData) {
      submit({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        text: formData.text,
      });
    }
  };

  const showSummary = !hideSummary && currentStep > 0 && currentStep < 8;

  return (
    <>
      <div className="grid-content">
        <Title />
        <div className={classNames(styles.container)}>
          <section className={styles.section}>
            <div className={styles.scroll} ref={scrollRef}>
              {repeatLoading ? <Spinner /> : <Flow />}
            </div>
            {showSummary && (
              <div className={styles.summary}>
                <Summary />
              </div>
            )}
          </section>
        </div>
      </div>
      {flow && <Footer onSubmit={onSubmit} isValid={!!formData?.isValid} />}
      {error && <ModalError />}
    </>
  );
};

export default Schedule;
