import { ReactComponentElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'UI';
import { serviceLocator } from 'services';

import './MessengerHeader.scss';

type MessengerHeaderProps = {
  onStartConversation: () => void;
  onStartGroupChart: () => void;
};

const MessengerHeader = (props: MessengerHeaderProps): ReactComponentElement<'div'> => {
  const {
    onStartConversation,
    onStartGroupChart,
  } = props;

  const history = useHistory();

  const handleLogoutClick = () => {
    serviceLocator.userService.logOut();
    history.push('/login');
  };

  return (
    <div className="MessengerHeader">
      <div className="MessengerHeader_holder">
        <Button
          content="Start dialog"
          width="184px"
          onClick={() => onStartConversation()}
        />
        <Button
          content="Create group chat"
          width="184px"
          type="transparent"
          onClick={() => onStartGroupChart()}
        />
      </div>
      <Button
        content="Log out"
        width="150px"
        type="warning"
        onClick={handleLogoutClick}
      />
    </div>
  )
};

export { MessengerHeader };