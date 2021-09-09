import { ReactComponentElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginForm } from 'UI';
import { serviceLocator } from 'services';

import './LoginPage.scss';

const LoginPage = ():ReactComponentElement<'div'> => {
  const history = useHistory();

  useEffect(() => {
    checkUserLogin();
  }, []);

  const checkUserLogin = async () => {
    const userId = serviceLocator.userService.checkUserLogin();
    if (userId) {
      await serviceLocator.userService.loadLoginUser(userId);
      history.push('/');
    }
  };

  return (
    <div className="LoginPage">
      <LoginForm/>
    </div>
  )
};

export { LoginPage };