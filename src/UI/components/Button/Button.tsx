import {MouseEvent, ReactComponentElement} from 'react';

import './Button.scss';

export const buttonPropType = ['primary', 'transparent', 'warning', 'system'] as const;
type ButtonPropType = typeof buttonPropType[number];

export type ButtonProps = {
  onClick: () => void,
  content?: string,
  type?: ButtonPropType,
  width?: string,
  withIcon?: boolean,
  icon?: string
};

const Button = (props: ButtonProps): ReactComponentElement<'button'> => {
  const {
    onClick,
    content = '',
    type = 'primary',
    width = '100%',
    withIcon = false,
    icon = '',
  } = props;

  return (
    <button
      role="button"
      className={`Button--${type}`}
      style={{
        width: width,
        justifyContent: withIcon && content.length > 0 ? 'flex-start' : 'center'
      }}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClick();
      }}
    >
      {withIcon && (
        <img
          role="button-icon"
          style={{
            marginRight: content.length > 0 ? '10px' : 0,
          }}
          src={icon}
          alt={content}
        />
      )}
      {content}
    </button>
  );
};

export { Button };