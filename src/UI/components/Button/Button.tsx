import {MouseEvent, ReactComponentElement} from 'react';

type ButtonProps = {
  content: ReactComponentElement<any> | string,
  onClick: () => void,
};

const Button = (props: ButtonProps) => {
  const {
    content,
    onClick
  } = props;

  return (
    <button
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