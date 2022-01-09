import styled from "styled-components";
import axios from "axios";
import React, { useState } from "react";

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
  font-size: 20px;
  font-weight: bolder;
`;

const UserId = styled.div`
  width: 80%;
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
`;

const UserIdTextBox = styled.input`
  width: 400px;
  height: 50px;
  border: 1px solid lightgrey;
  outline: none;
  margin-top: 3px;
`;

const UserIdBtn = styled.input`
  width: 410px;
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
  padding: 10px;
`;

const UserPassWordBox = styled.input`
  width: 400px;
  height: 50px;
  border: 1px solid lightgrey;
  outline: none;
`;

const UserNickname = styled.div`
  padding: 8px;
`;

const UserNicknameBox = styled.input`
  width: 400px;
  height: 50px;
  border: 1px solid lightgrey;
  outline: none;
  margin-top: 3px;
`;

const UserNicknameBtn = styled.div`
  width: 410px;
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
  width: 410px;
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

  const onChange = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "id":
        setID(e.target.value);
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
        console.log(nickname);
        break;
    }
  };

  const onSubmitId = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/register/check_id`,
        { id },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <CreateAccountBackground>
      <CreateAccountform>
        <JoinText>회원가입</JoinText>
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
              onClick={onSubmitId}
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
          <UserNicknameBtn> 닉네임 중복 확인</UserNicknameBtn>
        </UserNickname>

        <ContentSaveBtn
          // onClick={onContentSaveBtnClicked}
          type="submit"
          value="회원가입"
        >
          {/* <a href="#" onClick="alert('회원가입이 완료되었습니다.')"></a> */}
        </ContentSaveBtn>
      </CreateAccountform>
    </CreateAccountBackground>
  );
}

export default Join;
