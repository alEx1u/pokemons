import { GoogleIcon } from "../../icons/GoogleIcon";

interface GoogleButtonProps {
  onClick: () => void;
  loading?: boolean;
  label?: string;
  className?: string;
}

export const GoogleButton = ({
  onClick,
  loading = false,
  label = "Sign in with Google",
  className = "",
}: GoogleButtonProps) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={`flex items-center text-sm w-50 justify-center gap-3 px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition font-medium disabled:opacity-50 ${className}`}
  >
    <GoogleIcon />
    {loading ? "Loading..." : label}
  </button>
);
