import { GoogleIcon } from "../../icons/GoogleIcon";
import styles from './GoogleButton.module.scss';
interface GoogleButtonProps {
  onClick: () => void;
  loading?: boolean;
  label?: string;
  className?: string;
}

export const GoogleButton = ({
  onClick,
  loading = false,
  label = "",
}: GoogleButtonProps) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={styles['google-button']}
  >
    <GoogleIcon />
    {loading ? "Loading..." : label}
  </button>
);
