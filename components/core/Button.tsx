type ButtonProps = {
  type?: "button" | "submit";
  label: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function Button(props: ButtonProps) {
  const { type = "button", label, disabled, onClick } = props;

  return (
    <button
      disabled={disabled}
      type={type}
      className={`bg-green-700 py-2 px-4 rounded w-full mt-2 ${
        disabled ? `opacity-50` : ``
      }`}
      onClick={() => onClick?.()}
    >
      {label}
    </button>
  );
}
