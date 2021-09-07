import { ChangeEvent } from 'react';

type TextareaProps = {
  type: "text" | "number" | "textarea",
  value: string,
  onChange: (name:string, value: string) => void;
  name?: string,
}

const Input = (props: TextareaProps) => {
  const {
    type,
    name = '',
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