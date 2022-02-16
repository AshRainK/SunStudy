import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import store from "../store";

const Login_page_container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: middle;
  align-items: center;
  padding: 20px 10px;
  width: 500px;
  height: 700px;
`;

const Login_text = styled.div`
  margin: 70px 0;
  font-size: 24px;
  font-weight: 1000;
`;

const Login_form_container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 260px;
`;

const Input_ID = styled.input`
  width: 400px;
  height: 50px;
  border: 1px solid lightgrey;
  outline: none;
  margin-bottom: 10px;
  padding-left: 10px;
  &:focus {
    border: 1px solid grey;
  }
`;

const Input_PW = styled.input`
  width: 400px;
  height: 50px;
  border: 1px solid lightgrey;
  outline: none;
  margin-bottom: 10px;
  padding-left: 10px;
  &:focus{
    border: 1px solid grey;
`;

const Login_btn = styled.button`
  width: 413px;
  height: 50px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
  margin-top: 5px;
`;

const Signup_btn = styled.button`
  width: 413px;
  height: 50px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const Login = () => {
  const history = useHistory();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onSignupCliked = () => {
    window.scrollTo(0, 0);
    history.push("/join");
  };

  const onChange = (e) => {
    const elementId = e.target.id;
    const { value } = e.target;
    if (elementId === 'id') setId(value);
    else if (elementId === 'password') setPassword(value);
  };

  const onClickLoginBtn = () => {
    axios 
    .post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {id, password}, {withCredentials: true})
    .then((response)=> {
      if(response.data.payload.message){
        window.alert(response.data.payload.message);
      }
      else{
      store.dispatch({type: "LOGIN", user: response.data.payload});
      window.alert("정상적으로 로그인이 되었습니다.")
      history.push({pathname: '/'});
      }
    });
  };

  useEffect(()=> {
    if(store.getState("user").user !== null){
      history.push({pathname: "/"});
    }
  }, []);

  return (
    <Login_page_container>
      <Login_text>Login</Login_text>
      <Login_form_container>
        <Input_ID  onChange={onChange} type="text" id="id" value={id} placeholder="아이디 입력"/>
        <Input_PW onChange={onChange} type="text" id="password" value={password} placeholder="패스워드 입력"/>
        <Login_btn onClick={onClickLoginBtn}>로그인</Login_btn>
      </Login_form_container>
      <Signup_btn onClick={onSignupCliked}>회원가입</Signup_btn>
    </Login_page_container>
  );
};

export default Login;
