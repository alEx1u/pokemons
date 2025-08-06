import clsx from "clsx";
import styles from "./IconButton.module.scss";

type IconButtonVariant = "contained" | "outlined" | "icon";
export interface IconButtonProps extends React.ComponentPropsWithRef<"button"> {
  variant?: IconButtonVariant;
  icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  variant = "contained",
  disabled,
  icon,
  ...props
}) => {
  const cls = clsx(styles['icon-button'], styles[`icon-button--${variant}`]);

  return (
    <button
      className={cls}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {icon}
    </button>
  );
};
