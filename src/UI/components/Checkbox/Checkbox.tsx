import {ChangeEvent, ReactComponentElement} from 'react';
import { Checkbox as PrettyCheckbox } from 'pretty-checkbox-react';

import '@djthoms/pretty-checkbox';

export type CheckBoxProps = {
  value: boolean,
  onChange: (value: boolean) => void,
}

const Checkbox = (props: CheckBoxProps): ReactComponentElement<'input'> => {
  const {
    value,
    onChange,
  } = props;

  return (
    <PrettyCheckbox
      role="checkbox"
      color="primary"
      variant="thick"
      shape="curve"
      checked={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.checked)}
    />
  )
};

export { Checkbox };