import styled from 'styled-components';
import React from 'react';
import Header from './Components/Header';
import Login from './Screen/Login';
import Join from './Screen/Join';
import { HashRouter, Route } from 'react-router-dom';

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
  return (
    <div className="App">
      <HashRouter>
        <Body>
          <Header />
          <Main>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/join">
              <Join />
            </Route>
          </Main>
        </Body>
      </HashRouter>
    </div>
  );
}

export default App;
