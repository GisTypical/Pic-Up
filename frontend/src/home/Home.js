import React, { useState } from "react";
import { useQuery } from "react-query";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Repositories from "../repos/Repositories";
import Upload from "../upload/Upload";
import { user_loggedin } from "../utils/user-api";
import HomePictures from "../pictures/HomePictures";
import Navbar from "./Navbar";
import Settings from "./Settings";
import PicturePage from "../pictures/PicturePage";
import RepoPictures from "../pictures/RepoPictures";

const Home = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const [search, setSearch] = useState("");

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

  console.log(history);

  return (
    <div className="grid grid-flow-row grid-rows-[auto,1fr] h-full overflow-y-scroll overflow-hidden selection:bg-green-500">
      <Navbar username={user.data}>
        {/* Search */}
        {history.location.pathname === "/home" ? (
          <input
            className="flex-1 rounded-lg p-1 hidden mx-8 border-transparent bg-gray-700 md:block focus:ring-green-500 focus:border-green-500"
            type="search"
            name="search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Búsqueda por tags"
          />
        ) : (
          <div></div>
        )}
      </Navbar>
      <Switch>
        <Route exact path={path}>
          <HomePictures search={search} setSearch={setSearch}></HomePictures>
        </Route>
        <Route exact path={`${path}/repo`}>
          <Repositories></Repositories>
        </Route>
        <Route path={`${path}/settings`}>
          <Settings></Settings>
        </Route>
        <Route path={`${path}/upload`}>
          <Upload></Upload>
        </Route>
        <Route path={`${path}/picture/:pic_id`}>
          <PicturePage></PicturePage>
        </Route>
        <Route path={`${path}/repo/:repo_id`}>
          <RepoPictures></RepoPictures>
        </Route>
      </Switch>
    </div>
  );
};

export default Home;
