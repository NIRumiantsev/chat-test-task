import { ReactComponentElement } from 'react';
import { Button } from 'UI';
import { CloseIcon } from 'assets';

import './Modal.scss';

type ModalProps = {
  title: string,
  content: ReactComponentElement<'div'> | string,
  onClose: () => void,
};

const Modal = (props: ModalProps): ReactComponentElement<'div'> => {
  const {
    title,
    content,
    onClose,
  } = props;

  return (
    <div className="Modal">
      <div
        className="Modal_mask"
        onClick={onClose}
      />
      <div className="Modal_window">
        <div className="Modal_header">
          <div className="Modal_holder">
            <h2 className="Modal_title">{title}</h2>
            <Button
              type="system"
              width="45px"
              withIcon={true}
              icon={CloseIcon}
              onClick={onClose}
            />
          </div>
        </div>
        {content}
      </div>
    </div>
  );
};

export { Modal };