import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import store from "../../store";

const EditMypage_container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  width: 80vw;
  height: 50vh;
  font-family: "Lato", sans-serif;
  font-weight: 1000;
  font-size: 24px;
  //background-color: yellow;
`;

const Myprofile = styled.div`
  display: flex;
  font-size: 36px;
  margin-bottom: 60px;
  margin-top: 20px;
  background-color: black;
  color: white;
  padding: 5px;
`;

const Nickname_container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //background-color: green;
`;

const Nickname = styled.input`
  margin-top: 10px;
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

const NicknameC_btn = styled.button`
  border: none;
  color: white;
  background-color: black;
  cursor: pointer;
  font-size: 18px;
  margin: 10px;
`;

const Password_container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  //background-color: green;
`;

const Password = styled.input`
  margin-top: 10px;
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
  border: none;
  color: white;
  background-color: black;
  cursor: pointer;
  font-size: 18px;
  margin: 10px;
`;

const Aboutme_container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //background-color: green;
  margin-top: 50px;
`;

const Aboutme = styled.textarea`
  height: 15vh;
  overflow: auto;
  margin-top: 12px;
  padding: 5px;
  font-size: 16px;
  font-weight: 800;
  resize: none;
  width: 45vw;
  font-family: "Lato", sans-serif;
  &:focus {
    outline: none;
  }
`;

const Genre_container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
`;

const Genre = styled.input`
  padding: 10px;
  font-weight: 800;
  display: flex;
`;

const Checkbox = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-around;
  font-size: 16px;
  width: 40vw;
`;

const Modify_btn = styled.button`
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
`;

const MypageEdit = (props) => {
  const history = useHistory();
  const params = useParams();
  const [nickname, setNickname] = useState("");
  const [about_me, setAboutme] = useState("");
  const [id, setID] = useState("");

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
        setNickname(nickname);
        setAboutme(about_me);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <EditMypage_container>
        <Myprofile>Edit My Profile</Myprofile>
        <Page_area>
          <Nickname_container>
            Nickname
            <Line></Line>
            <Nickname defaultValue={nickname}></Nickname>
            <NicknameC_btn>confirm</NicknameC_btn>
          </Nickname_container>
          <Password_container>
            Change Password
            <Line></Line>
            <Password type="password"></Password>
            <PasswordC_btn>confirm</PasswordC_btn>
          </Password_container>
          <Aboutme_container>
            About me
            <Line></Line>
            <Aboutme></Aboutme>
          </Aboutme_container>
          <Genre_container>
            Prefer Genre
            <Line></Line>
            <Checkbox>
              <Genre type="checkbox" id="cb1" value="pop" name="pop" />
              Pop
              <Genre type="checkbox" id="cb2" value="kpop" name="kpop" />
              K-Pop
              <Genre type="checkbox" id="cb3" value="rock" name="rock" />
              Rock
              <Genre type="checkbox" id="cb4" value="jazz" name="jazz" />
              Jazz
              <Genre type="checkbox" id="cb5" value="hiphop" name="hiphop" />
              Hiphop
              <Genre type="checkbox" id="cb6" value="disco" name="disco" />
              Disco
              <Genre
                type="checkbox"
                id="cb7"
                value="electronic"
                name="electronic"
              />
              Electronic Music
            </Checkbox>
          </Genre_container>
          <Modify_btn>Modify</Modify_btn>
        </Page_area>
      </EditMypage_container>
    </>
  );
};

export default MypageEdit;
