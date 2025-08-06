import Button from '../Button/Button';
import styles from './CloseButton.module.scss';
interface CloseButtonProps {
  onClick?: () => void;
}

export const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <Button theme='red' onClick={onClick} square>
      <span className={`${styles['close-btn__icon']}`}></span>
    </Button>
  );
};
