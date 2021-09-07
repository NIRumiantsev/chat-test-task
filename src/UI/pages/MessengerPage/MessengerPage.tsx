import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { serviceLocator } from 'services';

const MessengerPage = () => {
  const history = useHistory();

  useEffect(() => {
    checkUserLogin();
  }, []);

  const checkUserLogin = async () => {
    const userId = serviceLocator.userService.checkUserLogin();
    if (userId) {
      await serviceLocator.userService.loadLoginUser(userId);
    } else {
      history.push('/login');
    }
  };

  return (
    <div>
      Messenger
    </div>
  )
};

export { MessengerPage };