import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <div className="bg-gray-900 text-white h-screen tracking-wide">
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing></Landing>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/signup">
            <Signup></Signup>
          </Route>
          <Route path="*">404</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
