import * as styles from "./modal.css";

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Modal = ({
  isOpen,
  title,
  message,
  confirmLabel,
  onCancel,
  onConfirm,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.modalTitle}>{title}</h3>
        <p className={styles.modalMessage}>{message}</p>
        <div className={styles.modalButtons}>
          <button
            type="button"
            className={styles.modalCancelButton}
            onClick={onCancel}
          >
            취소
          </button>
          <button
            type="button"
            className={styles.modalDeleteButton}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
