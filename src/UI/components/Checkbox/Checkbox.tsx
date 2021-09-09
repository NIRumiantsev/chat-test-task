import { ChangeEvent } from 'react';
import { Checkbox as PrettyCheckbox } from 'pretty-checkbox-react';

import '@djthoms/pretty-checkbox';

type CheckBoxProps = {
  value: boolean,
  onChange: (value: boolean) => void,
}

const Checkbox = (props: CheckBoxProps) => {
  const {
    value,
    onChange,
  } = props;

  return (
    <PrettyCheckbox
      color="primary"
      variant="thick"
      shape="curve"
      checked={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.checked)}
    />
  )
};

export { Checkbox };