import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import store from "../../store";
import Basic from "./Basic";
import MypageEdit from "./MypageEdit";
import UserPosting from "./UserPostings";
import ChangePassword from "./ChangePassword";

const Mypage_container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 100px;
  width: 80vw;
  height: 50vh;
  font-family: "Lato", sans-serif;
  font-weight: 1000;
  font-size: 24px;
  //background-color: yellow;
`;

const Menu_area = styled.div`
  width: 150px;
  height: 200px;
  display: flex;
  flex-direction: row;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Menu_container = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 150px;
  background-color: black;
  align-items: center;
  //justify-content: center;
`;

const Information_btn = styled.div`
  background-color: white;
  width: 130px;
  height: 30px;
  font-size: 15px;
  text-align: center;
  //vertical-align: middle;
  color: black;
  border: none;
  cursor: pointer;
  margin-top: 10px;
`;

const Postings_btn = styled.div`
  background-color: white;
  width: 130px;
  height: 30px;
  font-size: 15px;
  text-align: center;
  //vertical-align: middle;
  color: black;
  border: none;
  cursor: pointer;
  margin-top: 10px;
`;

const Change_passwordbtn = styled.div`
  background-color: white;
  width: 130px;
  height: 30px;
  font-size: 15px;
  text-align: center;
  //vertical-align: middle;
  color: black;
  border: none;
  cursor: pointer;
  margin-top: 10px;
`;

const Edit_profilebtn = styled.div`
  background-color: white;
  width: 130px;
  height: 30px;
  font-size: 15px;
  text-align: center;
  //vertical-align: middle;
  color: black;
  border: none;
  cursor: pointer;
  margin-top: 10px;
`;

const Mypage = () => {
  const history = useHistory();
  const [nickname, setNickname] = useState("");
  const [about_me, setAboutme] = useState("");
  const [genres, setGenres] = useState("");
  const [mode, setMode] = useState("myProfile");

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
        const { genres } = response.data.payload.genre;
        console.log(response.data.payload);
        setNickname(nickname);
        setAboutme(about_me);
        setGenres(genres);
      })
      .catch((err) => console.error(err));
  }, []);

  const onMenuButtonClick = (e) => {
    if (e.target.id === "myProfile") {
      setMode("myProfile");
      console.log(e.target.id);
    } else if (e.target.id === "editProfile") {
      setMode("editProfile");
    } else if (e.target.id === "postings") {
      setMode("postings");
    } else if (e.target.id === "changepwd") {
      setMode("changepwd");
    }
  };

  return (
    <Mypage_container>
      <Menu_area>
        <Menu_container>
          <Information_btn
            id="myProfile"
            type="button"
            onClick={onMenuButtonClick}
          >
            Profile
          </Information_btn>
          <Postings_btn type="button" id="postings" onClick={onMenuButtonClick}>
            Postings
          </Postings_btn>
          <Change_passwordbtn
            type="button"
            id="changepwd"
            onClick={onMenuButtonClick}
          >
            Change Password
          </Change_passwordbtn>
          <Edit_profilebtn
            id="editProfile"
            type="button"
            onClick={onMenuButtonClick}
          >
            Edit My Profile
          </Edit_profilebtn>
        </Menu_container>
      </Menu_area>
      <div>
        {mode === "myProfile" && (
          <Basic
            nickname={nickname}
            about_me={about_me}
            genres={genres}
          ></Basic>
        )}
        {mode === "postings" && <UserPosting></UserPosting>}
        {mode === "changepwd" && <ChangePassword></ChangePassword>}
        {mode === "editProfile" && <MypageEdit></MypageEdit>}
      </div>
    </Mypage_container>
  );
};

export default Mypage;
