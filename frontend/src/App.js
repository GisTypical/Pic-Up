import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <div className="h-screen">
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="*">404</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
