"use client";
import React from "react";
import styles from "./styles.module.scss";
import { Visit } from "@/app-types";
import { useRouter } from "next/navigation";
import { fetchLocalEndpoint } from "@/fetch";
import Spinner from "@/_components/Spinner";
import VisitCard from "@/app/(account)/user-account/_components/VisitCard";
import CancelVisitModal from "@/app/(account)/user-account/_components/CancelVisitModal";
import FeedbackModal from "@/app/(account)/user-account/_components/FeedbackModal";
import { useGeneralData } from "@/providers/general";

const VisitsComponent = () => {
  const router = useRouter();
  const { user, contacts } = useGeneralData();

  const [visits, setVisits] = React.useState<Array<Visit> | null>(null);
  const [feedbackLoading, setFeedbackLoading] = React.useState(false);

  React.useEffect(() => {
    if (user?.token) {
      fetchLocalEndpoint({
        url: `user-visits`,
        body: {
          token: user?.token,
          group: "126001",
        },
        onSuccess: (response) => {
          setVisits(response.visits.reverse());
        },
      });
    }
  }, []);

  const onSendFeedback = (id: string, mark: number, text: string) => {
    let visit;

    if (visits) {
      visit = visits.find((visit) => String(visit.id) === id);
    }

    if (visit) {
      fetchLocalEndpoint({
        url: `feedback`,
        body: {
          token: user?.token,
          location: visit.company.id,
          staff: visit.staff.id,
          mark,
          text,
          name: user?.name || "Visitor",
        },
        onBefore: () => {
          setFeedbackLoading(true);
        },
        onSuccess: (response) => {
          // console.log({ response });
          router.back();
        },
        onFinally: () => {
          setFeedbackLoading(false);
        },
      });
    }
  };

  if (!visits || !user?.token) {
    return <Spinner />;
  }

  const onCancel = (id: string) => {
    setVisits((prevState) => {
      if (prevState) {
        return prevState.map((visit) => {
          if (String(visit.id) === id) {
            return {
              ...visit,
              deleted: true,
            };
          }
          return visit;
        });
      }
      return prevState;
    });
  };

  const result = visits.reduce(
    (acc, curr) => {
      const isPassed =
        curr.deleted ||
        new Date(curr.datetime).getTime() < new Date().getTime();
      return {
        passed: [...acc.passed, ...(isPassed ? [curr] : [])],
        upcoming: [...acc.upcoming, ...(!isPassed ? [curr] : [])],
      };
    },
    { passed: [] as Array<Visit>, upcoming: [] as Array<Visit> },
  );

  return (
    <>
      <div className={styles.cards}>
        {result.upcoming.map((visit) => (
          <div className={styles.card} key={visit.id}>
            <VisitCard visit={visit} contacts={contacts} isFuture />
          </div>
        ))}
        {result.passed.map((visit, index) => (
          <div className={styles.card} key={visit.id}>
            {index === 0 && <h5>Минулі</h5>}
            <VisitCard visit={visit} contacts={contacts} isFuture={false} />
          </div>
        ))}
      </div>
      <CancelVisitModal token={user.token} onSuccess={onCancel} />
      <FeedbackModal onSubmit={onSendFeedback} loading={feedbackLoading} />
    </>
  );
};

export default VisitsComponent;
