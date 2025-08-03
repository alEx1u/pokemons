import clsx from "clsx";

interface TitleProps {
  tag?: "h1" | "h2" | "span" | "div";
  variant?:
    | "title"
    | "sub-title"
    | "title-regular"
    | "body"
    | "sub-body"
    | "title-body";
  children: React.ReactNode;
  className?: string;
}

const fontTypes = {
  title: "text-xl font-semibold capitalize",
  "sub-title": "text-lg font-medium capitalize",
  "title-regular": "text-lg font-normal",
  body: "text-base font-medium",
  "title-body": "text-base font-semibold",
  "sub-body": "text-sm font-normal",
};

export const Typography = ({
  children,
  tag = "div",
  variant = "title",
  className,
}: TitleProps) => {
  const Component = tag;

  return (
    <Component className={clsx(className, [fontTypes[variant]])}>
      {children}
    </Component>
  );
};
