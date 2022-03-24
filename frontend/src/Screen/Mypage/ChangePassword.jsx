import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import store from "../../store";

const EditMypage_container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0;
  //width: 70vw;
  margin-top: 300px;
  margin-left: 20px;
  font-family: "Lato", sans-serif;
  font-weight: 1000;
  font-size: 24px;
  //background-color: yellow;
`;

const Title = styled.div`
  display: flex;
  font-size: 36px;
  margin-bottom: 40px;
  margin-top: 20px;
  margin-left: 30px;
  background-color: black;
  color: white;
  padding: 5px;
`;

const Password_container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45vw;
  margin: 20px;
  //background-color: green;
`;

const Password = styled.input`
  margin: 12px 0 50px 0;
  height: 15px;
  padding: 10px;
  font-size: 15px;
  font-weight: 800;
  resize: none;
  font-family: "Lato", sans-serif;
  &:focus {
    outline: none;
  }
`;

const PasswordC_btn = styled.button`
  align-items: center;
  width: 80px;
  border: none;
  color: white;
  background-color: black;
  cursor: pointer;
  font-size: 18px;
  margin: 10px;
`;

const Line = styled.div`
  border-bottom: 1px solid grey;
  width: 12vw;
`;

const Page_area = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 40px;
`;

const ChangePassword = (props) => {
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (store.getState("user").user === null) {
      history.push({ pathname: "/" });
    }
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/mypage`, {
        withCredentials: true,
      })
      .then((response) => {
        const { about_me, id, nickname, password, user_id } =
          response.data.payload.user;
        console.log(response.data.payload);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <EditMypage_container>
      <Title>Change Password</Title>

      <Page_area>
        <Password_container>
          Old password
          <Line></Line>
          <Password type="password"></Password>
          New password
          <Line></Line>
          <Password type="password"></Password>
          Confirm new password
          <Line></Line>
          <Password type="password"></Password>
          <PasswordC_btn>confirm</PasswordC_btn>
        </Password_container>
      </Page_area>
    </EditMypage_container>
  );
};

export default ChangePassword;
