"use client";

import React, { useState } from "react";
import Modal from "@/_components/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.scss";
import StarRating from "@/_components/Rating";
import CustomInput from "@/_components/CustomInput";
import { PrimaryButton } from "@/_components/CTA/Buttons/PrimaryButton";

const FeedbackModal = ({
  onSubmit,
  loading,
}: {
  onSubmit: (id: string, rating: number, text: string) => void;
  loading: boolean;
}) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const visitId = useSearchParams().get("feedbackId");
  const router = useRouter();

  React.useEffect(() => {
    if (!visitId) {
      setRating(0);
      setText("");
    }
  }, [visitId]);

  if (!visitId) {
    return <></>;
  }

  return (
    <Modal
      open={true}
      onClose={() => {
        router.push("/user-account/visits");
      }}
    >
      <div className={styles.modal}>
        <h3>Оцініть ваш візит</h3>
        <StarRating onSelect={setRating} rating={rating} />
        <CustomInput
          textarea
          value={text}
          onChange={(e: any) => setText(e.target.value)}
          placeholder="Залиште відгук"
        />
        <div className={styles.buttons}>
          <PrimaryButton
            onClick={() => onSubmit(visitId, rating, text)}
            disabled={rating === 0 || text.length <= 5 || loading}
            loading={loading}
          >
            Залишити відгук
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export default FeedbackModal;
