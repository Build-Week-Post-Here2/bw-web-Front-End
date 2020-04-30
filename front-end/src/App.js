import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";
function App() {
  return (
    <Router>
      <div className="App">
        <header className="Login-header"></header>
        <Switch>
        
        <Route path="/LoginForm" component={LoginForm} />
        <Route path="/Register" component={Register} />
       
        </Switch>

      </div>

    </Router>
  );
}

export default App;
