import { ReactComponentElement } from 'react';
import { Button } from 'UI';

type ModalProps = {
  content: ReactComponentElement<'div'> | string,
  onClose: () => void,
};

const Modal = (props: ModalProps) => {
  const {
    content,
    onClose,
  } = props;

  return (
    <div>
      <Button
        content="x"
        onClick={onClose}
      />
      {content}
    </div>
  );
};

export { Modal };