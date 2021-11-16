import React from 'react';
import styled from 'styled-components';

const Header_container = styled.div`
  display: flex;
  flex-direction: column;
  height: 180px;
`;

const Login_container = styled.div`
  margin-top: 10px;
  margin-right: 20px;
  display: flex;
  justify-content: right;
  position: relative;
`;

const Login_textb = styled.button`
  font-size: 15px;
  color: black;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
`;

const Header_logo = styled.div`
  position: relative;
  top: -14px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-left: 45px;
`;

const Header_title_container = styled.div`
  display: flex;
  height: 130px;
  width: 130px;
  border: 5px solid white;
`;

const Header_title = styled.div`
  margin: 15px 5px;
  font-size: 25px;
  font-weight: 600;
  color: white;
  font-family: 'Rock Salt', cursive;
  line-height: 1.35em;
`;

const Search = styled.div`
  top: -50px;
  right: 20px;
  display: flex;
  justify-content: right;
  position: relative;
`;

const Search_bar = styled.input`
  width: 15%;
  height: 38px;
  position: relative;
  border: none;
  background: transparent;
  outline: none;
  color: white;
  caret-color: white;
  border-bottom: 2px solid white;
  font-size: 15px;
`;

const Search_btn = styled.button`
  background: transparent;
  color: white;
  position: absolute;
  right: 0.5%;
  top: 10px;
  font-size: 18px;
  border: none;
  cursor: pointer;
`;

const Header = () => {
  return (
    <Header_container>
      <Login_container>
        <Login_textb>Login</Login_textb>
      </Login_container>
      <Header_logo>
        <Header_title_container>
          <Header_title>My Music Record.</Header_title>
        </Header_title_container>
      </Header_logo>
      <Search>
        <Search_bar type="text" placeholder="Search" />
        <Search_btn type="submit">
          <i class="fas fa-search"></i>
        </Search_btn>
      </Search>
    </Header_container>
  );
};

export default Header;
