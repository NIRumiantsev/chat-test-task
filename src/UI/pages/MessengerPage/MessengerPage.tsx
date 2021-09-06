import { useEffect } from 'react';
import { serviceLocator } from 'services';

const MessengerPage = () => {
  useEffect(() => {
    serviceLocator.userService.loadUserList();
  }, []);

  return (
    <div>
      Messenger
    </div>
  )
};

export { MessengerPage };