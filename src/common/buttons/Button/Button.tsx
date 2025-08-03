import { ButtonHTMLAttributes, ReactNode } from "react";

type Theme = "red" | "blue";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  theme: Theme;
}

const Button = ({
  children,
  theme,
  className = "",
  ...props
}: IButtonProps) => {
  const baseStyles =
    "border py-2 px-1 rounded-xl text-sm w-50 text-amber-50 hover:shadow-xl transition";
  const themeStyles =
    theme == "red"
      ? "bg-red-400  hover:bg-red-500"
      : "bg-teal-400 hover:bg-teal-500";
  return (
    <button className={`${baseStyles} ${themeStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
