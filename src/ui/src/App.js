import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./Components/login.component";
import SignUp from "./Components/signup.component";
import Main from "./Components/main.component";

function App() {
  var showLoginButton = true
  var showSignUpButton = true
  return (<Router>
    <div className="App">
      

      <div>
        <div>
          
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/logout" component={Login} />
          </Switch>
          
        </div>
      </div>
    </div></Router>
  );
}

export default App;