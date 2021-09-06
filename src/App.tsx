import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import { appRoutes } from "./routes";

import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App_container">
          <Switch>
            {appRoutes}
            <Redirect to={'/messenger'}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;