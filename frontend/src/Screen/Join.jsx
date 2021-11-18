import styled from 'styled-components';
import axios from 'axios';

const CreateAccountBackground = styled.div`
  min-width: 800px;
  min-height: 800px;
  margin: 0px;
  background-color: #f5f5f5;
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

const UserId = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const UserIdTextBox = styled.input`
  width: 200px;
  height: 30px;
  margin-top: 3px;
  border-radius: 10px;
  border: solid 1px;
`;

const UserIdBtn = styled.input`
  margin-left: 10px;
  width: 100px;
  height: 30px;
  cursor: pointer;
  box-shadow: 0 1px gray;
  border-radius: 5px;
`;

const UserPassWord = styled.div`
  padding: 10px;
`;

const UserPassWordBox = styled.input`
  width: 310px;
  height: 30px;
  border-radius: 10px;
  border: solid 1px;
`;

const UserNickname = styled.div`
  padding: 10px;
`;

const UserNicknameBox = styled.input`
  width: 310px;
  height: 30px;
  border-radius: 10px;
  border: solid 1px;
`;

const ContentSave = styled.div`
  padding-left: 10px;
`;

const ContentSaveBtn = styled.input`
  margin-top: 20px;
  width: 150px;
  height: 30px;
  cursor: pointer;
  box-shadow: 0 1px gray;
  border-radius: 5px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function Join() {
  const onContentSaveBtnClicked = async () => {
    const id = document.querySelector('#id');
    const password = document.querySelector('#password');
    const nickname = document.querySelector('#nickname');

    await axios.post('http://localhost:8000/post/create', { title: 'Hello', post_body: 'world' }).then((response) => console.log(response));
  };

  return (
    <CreateAccountBackground>
      <CreateAccountform>
        <div>회원가입</div>
        <Container>
          <UserId>
            <div>ID</div>
            <div>
              <UserIdTextBox type="text" name="id" placeholder="아이디를 입력하세요(5~12자)" maxLength="10" minLength="5"></UserIdTextBox>
              <UserIdBtn type="submit" value="ID 중복 확인"></UserIdBtn>
            </div>
          </UserId>
        </Container>
        <Container>
          <UserPassWord>
            Password <br></br>
            <UserPassWordBox type="password" name="password" placeholder="비밀번호를 입력하세요"></UserPassWordBox>
          </UserPassWord>
        </Container>

        <Container>
          <UserPassWord>
            Password Check <br></br>
            <UserPassWordBox type="password" name="passwordCheck" placeholder="비밀번호를 입력하세요"></UserPassWordBox>
          </UserPassWord>
        </Container>

        <Container>
          <UserNickname>
            Nickname <br></br>
            <UserNicknameBox type="text" name="nickname" placeholder="닉네임을 입력하세요"></UserNicknameBox>
          </UserNickname>
        </Container>

        <Container>
          <ContentSave>
            <ContentSaveBtn onClick={onContentSaveBtnClicked} type="submit" value="회원가입"></ContentSaveBtn>
          </ContentSave>
        </Container>
      </CreateAccountform>
    </CreateAccountBackground>
  );
}

export default Join;
