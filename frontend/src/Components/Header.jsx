import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Header_container = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-between;
  background-color: black;
  align-items: center;
`;

const Sidebar_button_toggle = styled.div`
  margin-left: 20px;
`;

const Search_login_container = styled.div`
  display: flex;
  margin-right: 30px;
`;
const Login_container = styled.div`
  margin-right: 20px;
  display: flex;
`;

const Login_textb = styled.button`
  font-size: 15px;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
`;

const Logo_container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo_shape = styled.div`
  display: flex;
  height: 130px;
  width: 130px;
  border: 5px solid black;
  margin-top: 18px;
  cursor: pointer;
`;

const Logo_title = styled.div`
  margin: 15px 5px;
  font-size: 25px;
  font-weight: 600;
  color: black;
  font-family: 'Rock Salt', cursive;
  line-height: 1.35em;
`;

const Search = styled.div`
  display: flex;
  margin-right: 70px;
`;

const Search_bar = styled.input`
  height: 30px;
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
  position: relative;
  right: 30px;
  font-size: 18px;
  border: none;
  cursor: pointer;
`;

const Header = ({ onSidebarToggleButtonClicked }) => {
  const history = useHistory();

  const onLoginbtnCliked = () => {
    history.push('/login');
  };

  const onLogoCliked = () => {
    history.push('/');
  };

  return (
    <div>
      <Header_container>
        <Sidebar_button_toggle>
          <i style={{ color: 'white', cursor: 'pointer' }} class="fas fa-bars" onClick={onSidebarToggleButtonClicked}></i>
        </Sidebar_button_toggle>
        <Search_login_container>
          <Search>
            <Search_bar type="text" placeholder="Search" />
            <Search_btn type="submit">
              <i class="fas fa-search"></i>
            </Search_btn>
          </Search>
          <Login_container>
            <Login_textb onClick={onLoginbtnCliked}>Login</Login_textb>
          </Login_container>
        </Search_login_container>
      </Header_container>
      <Logo_container>
        <Logo_shape onClick={onLogoCliked}>
          <Logo_title>My Music Record.</Logo_title>
        </Logo_shape>
      </Logo_container>
    </div>
  );
};

export default Header;
