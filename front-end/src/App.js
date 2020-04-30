import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './utils/ProtectedRoute'
import SignIn from "./components/Signin";
import { UserContext } from './context/UserContext'
import { UserDash } from './components/UserDash'
import Header from './components/header/header.component'


function App(){
    return (
      <UserContext.Provider value={{}}>
        <Router>
          <div>
            <Header/>
            <Switch>
              <Route path='/log-in' component={SignIn}/>
              <PrivateRoute exact path='/dashboard' component={UserDash} />
            </Switch>
          </div>
        </Router>
      </UserContext.Provider>
    );
}
export default App;