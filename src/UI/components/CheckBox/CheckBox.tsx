import {ChangeEvent} from "react";

type CheckBoxProps = {
  value: boolean,
  onChange: (value: boolean) => void,
}

const CheckBox = (props: CheckBoxProps) => {
  const {
    value,
    onChange,
  } = props;

  return (
    <input
      type="checkbox"
      checked={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.checked)}
    />
  )
};

export { CheckBox };