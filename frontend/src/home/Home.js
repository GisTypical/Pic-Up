import React, { useState } from "react";
import { useQuery } from "react-query";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Loading from "../common/Loading";
import Logo from "../common/Logo";
import HomePictures from "../pictures/HomePictures";
import PicturePage from "../pictures/PicturePage";
import RepoPictures from "../pictures/RepoPictures";
import Repositories from "../repos/Repositories";
import Upload from "../upload/Upload";
import { user_loggedin } from "../utils/user-api";
import Navbar from "./Navbar";
import Settings from "./Settings";

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
    return <Loading />;
  }

  return (
    <div className="grid grid-flow-row grid-rows-[auto,1fr] h-full">
      <Navbar
        username={user.data}
        logo={<Logo setSearch={setSearch} url={"home"}></Logo>}
      >
        {/* Search */}
        {history.location.pathname === "/home" ? (
          <input
            className="flex-1 rounded-lg py-1 px-4 hidden mx-8 border-transparent bg-gray-700 md:block focus:ring-green-500 focus:border-green-500"
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
          <PicturePage username={user.data}></PicturePage>
        </Route>
        <Route path={`${path}/repo/:repo_id`}>
          <RepoPictures></RepoPictures>
        </Route>
      </Switch>
    </div>
  );
};

export default Home;
