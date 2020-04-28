import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

//components
import PrivateRoute from './utils/ProtectedRoute'

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Super Amazing App on the way</h1>
        <Link to='/login'>Login</Link>
        <br/>
        <Link to='/protected'>Protected</Link>
        <Switch>
          <PrivateRoute exact path='protected' />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
