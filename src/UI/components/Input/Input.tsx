import { ChangeEvent } from 'react';

type TextareaProps = {
  type: "text" | "number" | "textarea",
  name: string,
  value: string,
  onChange: (name:string, value: string) => void;
}

const Input = (props: TextareaProps) => {
  const {
    type,
    name,
    value,
    onChange,
  } = props;

  return (
    <input
      type={type}
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(name, event.target.value)}
    />
  );
};

export { Input };