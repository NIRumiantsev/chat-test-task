import { ChangeEvent, ReactComponentElement } from 'react';

import './Input.scss';

type TextareaProps = {
  type: "text" | "number" | "textarea",
  value: string,
  onChange: (name:string, value: string) => void;
  name?: string,
  placeholder?: string,
  withIcon?: boolean,
  icon?: string,
  title?: string,
  withoutBorder?: boolean
};

const Input = (props: TextareaProps): ReactComponentElement<'div'> => {
  const {
    type,
    value,
    onChange,
    name = '',
    placeholder = '',
    withIcon = false,
    icon = '',
    title = '',
    withoutBorder = false,
  } = props;

  return (
    <div className="Input">
      {!!title && (
        <span className="Input_title">{title}</span>
      )}
      {withIcon && (
        <img
          className="Input_icon"
          src={icon}
          alt="icon"
        />
      )}
      <input
        className={`Input_field${withIcon ? '--withIcon' : ''}`}
        style={withoutBorder ? {border: 'none'} : {}}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(name, event.target.value)}
      />
    </div>
  );
};

export { Input };