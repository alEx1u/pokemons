import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from './Button.module.scss';
import clsx from 'clsx';
type Theme = "red" | "blue";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  theme: Theme;
  square?: boolean;
}

const Button = ({
  children,
  theme,
  className = "",
  square,
  ...props
}: IButtonProps) => {

  const cls = clsx(
    styles.button, 
    theme == 'red' && styles['button--red'],
    theme == 'blue' && styles['button--blue'],
    square && styles['button--square'],
    className
  )

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
};

export default Button;
