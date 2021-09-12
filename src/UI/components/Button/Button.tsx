import {MouseEvent, ReactComponentElement} from 'react';

import './Button.scss';

type ButtonProps = {
  onClick: () => void,
  content?: string,
  type?: 'primary' | 'transparent' | 'warning' | 'system',
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