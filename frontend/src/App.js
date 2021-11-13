import styled from 'styled-components';
import React from 'react';
import Header from './Components/Header';
import Login from './Screen/Login';
import Join from './Screen/Join';
import { HashRouter, Route, Routes } from 'react-router-dom';

const Body = styled.div`
  min-width: 1200px;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
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
      <Body>
        <HashRouter>
          <Header />
          <Main>
            <Routes>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/join" element={<Join />}></Route>
            </Routes>
          </Main>
        </HashRouter>
      </Body>
    </div>
  );
}

export default App;
