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
      return window.alert("아이디를 입력해주세요");
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
      window.alert("이미 사용중인 아이디입니다.");
    } else {
      setIsIdCheckPassed(true);
      window.alert("사용 가능한 아이디입니다.");
    }
  };

  const onSubmitNicknameCheck = () => {
    if (nickname === "") {
      return window.alert("닉네임을 입력해주세요");
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
      window.alert("이미 사용중인 닉네임입니다.");
    } else {
      setIsNicknamePassed(true);
      window.alert("사용 가능한 닉네임입니다.");
    }
  };

  const onSubmitJoinButton = () => {
    if (password === "") {
      return window.alert("비밀번호를 입력해주세요");
    }
    if (passwordCheck === "") {
      return window.alert("비밀번호를 입력해주세요");
    }
    if (password !== passwordCheck) {
      return window.alert("비밀번호를 확인해주세요");
    }
    if (nickname === "") {
      return window.alert("닉네임을 입력해주세요");
    }
    if (isNicknamePassed === false) {
      return window.alert("닉네임 중복 확인을 해주세요.");
    }
    if (isIdCheckPassed === false) {
      return window.alert("아이디 중복 확인을 해주세요.");
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
          window.alert("회원가입이 완료되었습니다");
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
              placeholder="아이디를 입력하세요(5~12자)"
              maxLength="10"
              minLength="5"
              onChange={onChange}
              value={id}
            ></UserIdTextBox>
            <UserIdBtn
              type="submit"
              onClick={onSubmitIdCheck}
              value="ID 중복 확인"
            ></UserIdBtn>
          </div>
        </UserId>

        <UserPassWord>
          Password <br></br>
          <UserPassWordBox
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            onChange={onChange}
            value={password}
          ></UserPassWordBox>
        </UserPassWord>

        <UserPassWord>
          Password Check <br></br>
          <UserPassWordBox
            type="password"
            name="passwordCheck"
            placeholder="비밀번호를 입력하세요"
            onChange={onChange}
            value={passwordCheck}
          ></UserPassWordBox>
        </UserPassWord>

        <UserNickname>
          Nickname <br></br>
          <UserNicknameBox
            type="text"
            name="nickname"
            placeholder="닉네임을 입력하세요"
            onChange={onChange}
            value={nickname}
          ></UserNicknameBox>
          <UserNicknameBtn onClick={onSubmitNicknameCheck}>
            닉네임 중복 확인
          </UserNicknameBtn>
        </UserNickname>

        <ContentSaveBtn
          onClick={onSubmitJoinButton}
          type="submit"
          value="회원가입"
        ></ContentSaveBtn>
      </CreateAccountform>
    </CreateAccountBackground>
  );
}

export default Join;
