import React from "react";
import { useQuery } from "react-query";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { user_loggedin } from "../utils/user-api";
import Navbar from "./Navbar";
import Repositories from "./Repositories";
import Settings from "./Settings";

const Home = () => {
  const { path } = useRouteMatch();
  const history = useHistory();

  const { data: user, isLoading } = useQuery("user", user_loggedin, {
    onSuccess: ({ data }) => {
      if (!data) {
        history.push("/");
      }
    },
  });

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="grid grid-flow-row grid-rows-[auto,1fr] h-full overflow-y-scroll">
      <Navbar user={user.data}></Navbar>
      <Switch>
        <Route exact path={path}>
          <p>Estas logeado {user.data}</p>
        </Route>
        <Route path={`${path}/settings`}>
          <Settings user={user.data}></Settings>
        </Route>
        <Route path={`${path}/repositories`}>
          <Repositories user={user.data}></Repositories>
        </Route>
      </Switch>
    </div>
  );
};

export default Home;
