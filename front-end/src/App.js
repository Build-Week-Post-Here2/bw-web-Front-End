import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  
  return (
    
    <Router>
      <div className="App">
      <div className="Side">
      <Image></Image>
      </div>
        <Switch>
        {/* <Route path="/Home" component={Home} /> */}
        <Route path ="/" component={Login} />
            <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
        </Switch>
      </div>
   
    </Router>
  );
}

export default App;
