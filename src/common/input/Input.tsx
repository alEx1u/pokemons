import clsx from "clsx";
import styles from './Input.module.scss';
interface InputProps extends React.ComponentPropsWithRef<"input"> {
  isLoading?: boolean;
  error?: string;
}

export const Input = ({
  id,
  placeholder,
  error,
  ref,
  ...props
}: InputProps) => (
  <label htmlFor={id}>
    <div className={styles.placeholder}>{placeholder}</div>
    <input
      className={clsx(styles.input, error && styles['input--error'])}
      id={id}
      ref={ref}
      {...props}
    />
    <span className={styles.span}>{error}</span>
  </label>
);
