import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Login from "./Components/login.component";
import SignUp from "./Components/signup.component";
import Main from "./Components/main.component";


function App() {
  
  return (<Router>
    <div className="App">
      

      <div>
        <div>
          
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/logout" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/home" component={Main} />
          </Switch>
          
        </div>
      </div>
    </div></Router>
  );
}

export default App;