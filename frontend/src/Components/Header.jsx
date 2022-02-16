import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory,  Link } from "react-router-dom";
import store from "../store";
import axios from "axios";
import Search from "../Screen/Search";

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

const Login_btn = styled.button`
  font-size: 15px;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
`;

const Logout_btn = styled.button`
  font-size: 15px;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
`;

const Mypage_btn = styled.button`
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
  font-family: "Rock Salt", cursive;
  line-height: 1.35em;
`;

const Search_area = styled.div`
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

const Header = (onSidebarToggleButtonClicked) => {
  const history = useHistory();
  const [keyword, setKeyword] = useState();
  const [userData, setUserData] = useState(store.getState("user").user);

   store.subscribe(() => {
    setUserData(store.getState("user").user);
   });

  const onChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
    console.log(keyword);
  };

  const onLoginbtnCliked = () => {
    history.push("/login");
  };

  const onLogoCliked = () => {
    history.push("/");
  };

  const onLogoutbtnCliked = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
        withCredentials: true,
      })
      .then((response) => 
      { 
        store.dispatch({type: "LOGOUT"});
        window.alert("로그아웃 되었습니다");
      });
  };

  const onSearchbtnClicked = (e) => {
    e.preventDefault();
    history.push(`/search/${keyword}`);
  };

  return (
    <div>
      <Header_container>
        <Sidebar_button_toggle>
          <i
            style={{ color: "white", cursor: "pointer" }}
            class="fas fa-bars"
            onClick={onSidebarToggleButtonClicked}
          ></i>
        </Sidebar_button_toggle>
        <Search_login_container>
          <Search_area>
            <Search_bar onChange={onChange} type="text" placeholder="Search" />
            <Search_btn onClick={onSearchbtnClicked} type="submit">
              <i class="fas fa-search"></i>
            </Search_btn>
          </Search_area>
          <Login_container>
            {userData === null ? (
              <Login_btn onClick={onLoginbtnCliked}>Login</Login_btn>
            ) : (
              <Logout_btn onClick={onLogoutbtnCliked}>logout</Logout_btn>
            )}
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
