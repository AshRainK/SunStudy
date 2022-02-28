import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Login from "./Screen/Login";
import Join from "./Screen/Join";
import Home from "./Screen/Home";
import Postingpage from "./Screen/Postingpage";
import Postdetail from "./Screen/Postdetail";
import { HashRouter, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Genre from "./Screen/Genre";
import Mypage from "./Screen/Mypage/Mypage";
import axios from "axios";
import store from "./store";
import Search from "./Screen/Search";

const Body = styled.div`
  min-width: 1200px;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 100%;
  font-family: "Noto Sans KR", sans-serif;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function App() {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const onSidebarToggleButtonClicked = () => {
    setIsSidebarOpened(!isSidebarOpened);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        withCredentials: true,
      })
      .then((response) => {
        store.dispatch({ type: "LOGIN", user: response.data.payload });
      });
  }, []);

  return (
    <div className="App">
      <HashRouter>
        {isSidebarOpened && (
          <Sidebar
            isSidebarOpened={isSidebarOpened}
            onSidebarToggleButtonClicked={onSidebarToggleButtonClicked}
          />
        )}
        <Body>
          <Header onSidebarToggleButtonClicked={onSidebarToggleButtonClicked} />
          <Main>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/join">
              <Join />
            </Route>
            <Route exact path="/postdetail/:post_num">
              <Postdetail />
            </Route>
            <Route exact path="/postpage">
              <Postingpage />
            </Route>
            <Route exact path="/genre/:genre">
              <Genre />
            </Route>
            <Route exact path="/mypage">
              <Mypage />
            </Route>
            <Route exact path="/search/:keyword">
              <Search />
            </Route>
          </Main>
        </Body>
      </HashRouter>
    </div>
  );
}

export default App;
