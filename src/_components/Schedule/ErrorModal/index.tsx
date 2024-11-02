import * as React from "react";

import Modal from "../../Modal";
import Typography from "../../Typography";

import styles from "./styles.module.scss";
import { useScheduleStore } from "@/stores/schedule";
import { Icon } from "@/_components/Icon";
import { useGeneralData } from "@/providers/general";

const ModalError = () => {
  const error = useScheduleStore((state) => state.error);
  const { contacts } = useGeneralData();
  const resetStore = useScheduleStore((state) => state.actions.resetStore);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => setOpen(!!error), [error, setOpen]);

  return (
    <Modal open={open} onClose={resetStore} className={styles.modal}>
      <div className={styles.modalHeader}>
        <Icon name="alert" height={20} width={20} color="var(--error)" />
        <h4>{error || "Упс, шось пішло не так"}</h4>
      </div>
      <Typography size={3}>
        Спробуйте ще раз, або запишиться за номером телефону:
      </Typography>
      <Typography size={2}>
        <a href={contacts.phoneNumber.url}>{contacts.phoneNumber.label}</a>
      </Typography>
    </Modal>
  );
};

export default ModalError;
