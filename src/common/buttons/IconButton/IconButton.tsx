import clsx from "clsx";
import styles from "./IconButton.module.css";

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
  const classes = clsx(styles.button, styles[variant]);

  return (
    <button
      className={classes}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {icon}
    </button>
  );
};
