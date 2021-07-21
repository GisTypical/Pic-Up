import { useQuery } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import { user_loggedin } from "./utils/user-api";

function App() {
  const { data: user, isLoading } = useQuery("user", user_loggedin);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user.data ? <Home user={user.data}></Home> : <Landing></Landing>}
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/signup">
          <Signup></Signup>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
