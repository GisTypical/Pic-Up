import React from "react";
import { useQuery } from "react-query";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Navbar from "./Navbar";
import { user_loggedin } from "../utils/user-api";
import Settings from "./Settings";

const Home = () => {
  const { path, url } = useRouteMatch();
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
    <div className="grid grid-flow-row grid-rows-[auto,1fr] h-full">
      <Navbar user={user.data} path={url}></Navbar>
      <Switch>
        <Route exact path={path}>
          <p>Estas logeado {user.data}</p>
        </Route>
        <Route path={`${path}/settings`}>
          <Settings user={user.data}></Settings>
        </Route>
      </Switch>
    </div>
  );
};

export default Home;
