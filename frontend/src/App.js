import styled from 'styled-components';
import React, { useState } from 'react';
import Header from './Components/Header';
import Login from './Screen/Login';
import Join from './Screen/Join';
import Home from './Screen/Home';
import Postingpage from './Screen/Postingpage';
import Postdetail from './Screen/Postdetail';
import { HashRouter, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';

const Body = styled.div`
  min-width: 1200px;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 100%;
  font-family: 'Noto Sans KR', sans-serif;
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

  return (
    <div className="App">
      <HashRouter>
        {isSidebarOpened && <Sidebar isSidebarOpened={isSidebarOpened} onSidebarToggleButtonClicked={onSidebarToggleButtonClicked} />}
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
          </Main>
        </Body>
      </HashRouter>
    </div>
  );
}

export default App;
