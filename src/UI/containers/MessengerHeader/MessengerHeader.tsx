import {ReactComponentElement, useMemo} from 'react';
import { useHistory } from 'react-router-dom';
import { Button, useWindowDimensions } from 'UI';
import { serviceLocator } from 'services';
import { GroupIcon, UserIcon } from 'assets';
import { WindowDimensions } from 'types';

import './MessengerHeader.scss';

export type MessengerHeaderProps = {
  onStartConversation: () => void;
  onStartGroupChart: () => void;
};

const MessengerHeader = (props: MessengerHeaderProps): ReactComponentElement<'div'> => {
  const {
    onStartConversation,
    onStartGroupChart,
  } = props;

  const history = useHistory();

  const { width: windowWidth }: WindowDimensions = useWindowDimensions();

  const handleLogoutClick = () => {
    serviceLocator.userService.logOut();
    history.push('/login');
  };

  const isMobile = useMemo(() => {
    return windowWidth <= 500
  }, [windowWidth]);

  return (
    <div className="MessengerHeader">
      <div className="MessengerHeader_holder">
        <Button
          content={isMobile ? '' : 'Start dialog'}
          width={isMobile ? '45px' : '184px'}
          withIcon={true}
          icon={UserIcon}
          onClick={() => onStartConversation()}
        />
        <Button
          content={isMobile ? '' : 'Create group chat'}
          width={isMobile ? '45px' : '184px'}
          type="transparent"
          withIcon={true}
          icon={GroupIcon}
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