import clsx from "clsx";
import styles from "./Modal.module.scss";

export interface ModalProps {
  isShowing: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isShowing, onClose, children }: ModalProps) => (
  <div className={clsx({ [styles.modal_open]: isShowing })}>
    {isShowing && (
      <div className={styles.modal_overlay} aria-hidden onClick={onClose} />
    )}
    <div
      className={styles.modal_container}
      aria-modal
      aria-hidden
      tabIndex={-1}
      role="dialog"
    >
      {isShowing && children}
    </div>
  </div>
);
