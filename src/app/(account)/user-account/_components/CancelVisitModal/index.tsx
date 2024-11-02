"use client";

import React from "react";
import Modal from "@/_components/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import Typography from "@/_components/Typography";
import styles from "./styles.module.scss";
import { fetchLocalEndpoint } from "@/fetch";
import { PrimaryButton } from "@/_components/CTA/Buttons/PrimaryButton";
import { TertiaryButton } from "@/_components/CTA/Buttons/TertiaryButton";

const CancelVisitModal = ({
  token,
  onSuccess,
}: {
  token: string | null;
  onSuccess: (id: string) => void;
}) => {
  const [loading, setLoading] = React.useState(false);
  const visitId = useSearchParams().get("cancelId");
  const router = useRouter();

  if (!visitId || !token) {
    return <></>;
  }

  const cancelVisit = async () => {
    await fetchLocalEndpoint({
      url: `cancel-visit`,
      body: {
        token,
        visitId,
      },
      onBefore: () => setLoading(true),
      onSuccess: () => {
        onSuccess(visitId);
        router.back();
      },
      onFinally: () => setLoading(false),
    });
  };
  return (
    <Modal open onClose={router.back}>
      <div className={styles.modal}>
        <h3>Скасування Запису </h3>
        <Typography size={2}>
          Після скасування запис буде неможливо відноити
        </Typography>
        <div className={styles.buttons}>
          <TertiaryButton disabled={loading} onClick={cancelVisit}>
            Скасувати Запис
          </TertiaryButton>
          <PrimaryButton onClick={router.back}>Закрити</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export default CancelVisitModal;
