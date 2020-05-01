
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { UserContext } from './context/UserContext'
import Login from "./components/Login";
import Register from "./components/Register";
//components
import PrivateRoute from './utils/ProtectedRoute'
import { UserDash } from './components/UserDash'
import styled from 'styled-components'
import EditPost from './components/EditPost'
 
const H1 = styled.h1`
color: #ff5400ff;
`
function App() {
  
  return (
    <UserContext.Provider value={{}}>
      <Router>
        <div className="App">
          <Link to='/login'>Login</Link>
          <br />
          <Link to='register'>Register</Link>
          <br />
          <Link to='/UserDash'>User Dashboard</Link>
          <Switch>
            {/* <Route path="/Home" component={Home} /> */}
            <Route path="/login" component={Login} />
            <Route path="/Register" component={Register} />
            <PrivateRoute exact path='/UserDash' component={UserDash} />
            <PrivateRoute  path='/editPost/:id' component={EditPost} />
            
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
