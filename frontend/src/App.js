import { useQuery } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./home/Navbar";
import Home from "./home/Home";
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
    <div className="bg-gray-900 text-white h-screen tracking-wide">
      <Router>
        <Switch>
          <Route exact path="/">
            {user.data ? (
              <Home>
                <Navbar user={user.data}></Navbar>
              </Home>
            ) : (
              <Landing></Landing>
            )}
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
