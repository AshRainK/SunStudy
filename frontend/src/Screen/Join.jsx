import styled from "styled-components";
import axios from "axios";

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
  height: 600px;
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
  border: solid 1px;
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
  border: solid 1px;
`;

const ContentSaveBtn = styled.input`
  width: 410px;
  height: 50px;
  border: 1px solid lightgrey;
  background-color: black;
  color: white;
  outline: none;
  margin-top: 3px;
  border: solid 1px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

function Join() {
  const onContentSaveBtnClicked = async () => {
    const id = document.querySelector("#id");
    const password = document.querySelector("#password");
    const nickname = document.querySelector("#nickname");

    await axios
      .post("http://localhost:8000/post/create", {
        title: "Hello",
        post_body: "world",
      })
      .then((response) => console.log(response));
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
            ></UserIdTextBox>
            <UserIdBtn type="submit" value="ID 중복 확인"></UserIdBtn>
          </div>
        </UserId>

        <UserPassWord>
          Password <br></br>
          <UserPassWordBox
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
          ></UserPassWordBox>
        </UserPassWord>

        <UserPassWord>
          Password Check <br></br>
          <UserPassWordBox
            type="password"
            name="passwordCheck"
            placeholder="비밀번호를 입력하세요"
          ></UserPassWordBox>
        </UserPassWord>

        <UserNickname>
          Nickname <br></br>
          <UserNicknameBox
            type="text"
            name="nickname"
            placeholder="닉네임을 입력하세요"
          ></UserNicknameBox>
        </UserNickname>

        <ContentSaveBtn
          onClick={onContentSaveBtnClicked}
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
