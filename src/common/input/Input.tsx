import clsx from "clsx";

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
    <div className="mb-1 text-sm font-semibold">{placeholder}</div>
    <input
      className={clsx(
        "w-full rounded bg-neutral-100 p-3 shadow-sm focus:outline-none focus:ring-2",
        { ["bg-red-100 ring-1 ring-red-400"]: !!error }
      )}
      id={id}
      ref={ref}
      {...props}
    />
    <span className="text-sm text-red-400">{error}</span>
  </label>
);
