import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

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
`;

const Login_help = styled.div`
  display: flex;
  width: 413px;
  height: 40px;
  margin-top: 10px;
`;

const ID_remember_checkbox = styled.input`
  width: 18px;
  height: 18px;
  border: 1px solid #ccc;
  content: '';
`;

const ID_remember = styled.div`
  font-weight: 800;
  font-size: 15px;
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
  const onSignupCliked = () => {
    history.push('/join');
  };
  return (
    <Login_page_container>
      <Login_text>Login</Login_text>
      <Login_form_container>
        <Input_ID type="text" placeholder="아이디 입력" />
        <Input_PW type="text" placeholder="패스워드 입력" />
        <Login_btn>로그인</Login_btn>
        <Login_help>
          <ID_remember_checkbox type="checkbox" />
          <ID_remember>아이디 기억</ID_remember>
        </Login_help>
      </Login_form_container>
      <Signup_btn onClick={onSignupCliked}>회원가입</Signup_btn>
    </Login_page_container>
  );
};

export default Login;