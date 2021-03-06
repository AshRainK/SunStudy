import styled from "styled-components";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import store from "../store";

const CreateAccountBackground = styled.div`
  min-width: 800px;
  min-height: 800px;
  margin: 0px;
  background-color: white;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const CreateAccountform = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  width: 500px;
  height: 65-00px;
  justify-content: center;
  align-items: center;
`;

const JoinText = styled.div`
  margin: 25px 0;
  font-size: 24px;
  font-weight: bolder;
`;

const UserId = styled.div`
  width: 80%;
  display: flex;
  padding: 10px;
  margin-bottom: 5px;
  flex-direction: column;
  justify-content: center;
`;

const UserIdTextBox = styled.input`
  width: 400px;
  height: 50px;
  border: 1px solid lightgrey;
  outline: none;
  margin-top: 10px;
`;

const UserIdBtn = styled.input`
  width: 400px;
  height: 50px;
  border: 1px solid lightgrey;
  background-color: black;
  color: white;
  outline: none;
  margin-top: 10px;
  border: solid 1px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const UserPassWord = styled.div`
  padding: 5px;
`;

const UserPassWordBox = styled.input`
  width: 400px;
  height: 50px;
  border: 1px solid lightgrey;
  outline: none;
  margin-top: 5px;
`;

const UserNickname = styled.div`
  padding: 8px;
  margin-top: 5px;
`;

const UserNicknameBox = styled.input`
  width: 400px;
  height: 50px;
  border: 1px solid lightgrey;
  outline: none;
  margin-top: 10px;
`;

const UserNicknameBtn = styled.div`
  width: 400px;
  height: 50px;
  background-color: black;
  color: white;
  font-size: 13px;
  font-weight: bolder;
  outline: none;
  margin-top: 10px;
  border: solid 1px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentSaveBtn = styled.input`
  width: 400px;
  height: 50px;
  background-color: black;
  color: white;
  outline: none;
  margin-top: 20px;
  border: solid 1px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

function Join() {
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordcheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [isIdCheckPassed, setIsIdCheckPassed] = useState(false);
  const [isNicknamePassed, setIsNicknamePassed] = useState(false);
  const history = useHistory();

  useEffect(()=> {
    if(store.getState("user").user !== null){
      history.push({pathname: "/"});
    }
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "id":
        setID(e.target.value);
        setIsIdCheckPassed(false);
        console.log(id);
        break;
      case "password":
        setPassword(e.target.value);
        console.log(password);
        break;
      case "passwordCheck":
        setPasswordcheck(e.target.value);
        console.log(passwordCheck);
        break;
      case "nickname":
        setNickname(e.target.value);
        setIsNicknamePassed(false);
        console.log(nickname);
        break;
    }
  };

  const onSubmitIdCheck = () => {
    if (id === "") {
      return window.alert("???????????? ??????????????????");
    }

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/register/check_id`,
        { id },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        checkIdAvailable(response.data.already_exist);
      });
  };

  const checkIdAvailable = (already) => {
    if (already) {
      window.alert("?????? ???????????? ??????????????????.");
    } else {
      setIsIdCheckPassed(true);
      window.alert("?????? ????????? ??????????????????.");
    }
  };

  const onSubmitNicknameCheck = () => {
    if (nickname === "") {
      return window.alert("???????????? ??????????????????");
    }

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/register/check_nickname`,
        { nickname },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        checkNicknameAvailable(response.data.already_exist);
      });
  };
  const checkNicknameAvailable = (already) => {
    if (already) {
      window.alert("?????? ???????????? ??????????????????.");
    } else {
      setIsNicknamePassed(true);
      window.alert("?????? ????????? ??????????????????.");
    }
  };

  const onSubmitJoinButton = () => {
    if (password === "") {
      return window.alert("??????????????? ??????????????????");
    }
    if (passwordCheck === "") {
      return window.alert("??????????????? ??????????????????");
    }
    if (password !== passwordCheck) {
      return window.alert("??????????????? ??????????????????");
    }
    if (nickname === "") {
      return window.alert("???????????? ??????????????????");
    }
    if (isNicknamePassed === false) {
      return window.alert("????????? ?????? ????????? ????????????.");
    }
    if (isIdCheckPassed === false) {
      return window.alert("????????? ?????? ????????? ????????????.");
    }

    if (isIdCheckPassed && isNicknamePassed) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/register`,
          { id, password, nickname },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response);
          window.alert("??????????????? ?????????????????????");
          history.push("/login");
        });
    }
  };

  return (
    <CreateAccountBackground>
      <CreateAccountform>
        <JoinText>Join</JoinText>
        <UserId>
          <div>ID</div>
          <div>
            <UserIdTextBox
              type="text"
              name="id"
              placeholder="???????????? ???????????????(5~12???)"
              maxLength="10"
              minLength="5"
              onChange={onChange}
              value={id}
            ></UserIdTextBox>
            <UserIdBtn
              type="submit"
              onClick={onSubmitIdCheck}
              value="ID ?????? ??????"
            ></UserIdBtn>
          </div>
        </UserId>

        <UserPassWord>
          Password <br></br>
          <UserPassWordBox
            type="password"
            name="password"
            placeholder="??????????????? ???????????????"
            onChange={onChange}
            value={password}
          ></UserPassWordBox>
        </UserPassWord>

        <UserPassWord>
          Password Check <br></br>
          <UserPassWordBox
            type="password"
            name="passwordCheck"
            placeholder="??????????????? ???????????????"
            onChange={onChange}
            value={passwordCheck}
          ></UserPassWordBox>
        </UserPassWord>

        <UserNickname>
          Nickname <br></br>
          <UserNicknameBox
            type="text"
            name="nickname"
            placeholder="???????????? ???????????????"
            onChange={onChange}
            value={nickname}
          ></UserNicknameBox>
          <UserNicknameBtn onClick={onSubmitNicknameCheck}>
            ????????? ?????? ??????
          </UserNicknameBtn>
        </UserNickname>

        <ContentSaveBtn
          onClick={onSubmitJoinButton}
          type="submit"
          value="????????????"
        ></ContentSaveBtn>
      </CreateAccountform>
    </CreateAccountBackground>
  );
}

export default Join;
