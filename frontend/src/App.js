import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function App() {
  const [hola, setHola] = useState("");
  useEffect(() => {
    axios.get("/api/hola").then(({ data }) => {
      setHola(data);
    });
  }, [setHola]);
  return (
    <Router>
      <nav style={{ marginLeft: "10px" }}>
        <ul>
          <li>
            <Link to="/">to Principal</Link>
          </li>
          <li>
            <Link to="/hola">to Hola</Link>
          </li>
          <li>
            <Link to="/ruta2">to Ruta2</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/">
          Principal
        </Route>
        <Route path="/hola">{hola}</Route>
        <Route path="/ruta2">Ruta2</Route>
      </Switch>
    </Router>
  );
}

export default App;
