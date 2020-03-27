import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/bubbles" component={BubblePage} />
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
