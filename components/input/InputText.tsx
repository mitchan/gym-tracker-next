type InputTextProps = {
  type?: "text" | "password" | "number" | "hidden";
  label: string;
  name: string;
  value?: string | number;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

export function InputText(props: InputTextProps) {
  const { type = "text", name, label } = props;

  return (
    <div className="flex flex-col mb-1">
      {type !== "hidden" && <label>{label}</label>}
      <input
        type={type}
        name={name}
        value={props.value}
        disabled={props.disabled}
        className="border border-solid border-gray-400 rounded p-2 text-black"
        onChange={(e) => {
          props.onChange?.(e.target.value);
        }}
      />
    </div>
  );
}
