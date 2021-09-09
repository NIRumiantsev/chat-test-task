import {MouseEvent, ReactComponentElement} from 'react';

import './Button.scss';

type ButtonProps = {
  content: ReactComponentElement<any> | string,
  onClick: () => void,
  type?: 'primary' | 'transparent' | 'warning' | 'system',
  width?: string,
};

const Button = (props: ButtonProps): ReactComponentElement<'button'> => {
  const {
    content,
    onClick,
    type = 'primary',
    width = '100%',
  } = props;

  return (
    <button
      className={`Button--${type}`}
      style={{width: width}}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClick();
      }}
    >
      {content}
    </button>
  );
};

export { Button };