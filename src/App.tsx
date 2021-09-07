import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { appRoutes } from './routes';
import { serviceLocator } from './services';

import './App.scss';

const App = () => {
  useEffect(() => {
    loadUsersList();
  }, []);

  const loadUsersList = async () => {
    await serviceLocator.userService.loadUserList();
  };

  return (
    <Router>
      <div className="App">
        <div className="App_container">
          <Switch>
            {appRoutes}
            <Redirect to={'/'}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;