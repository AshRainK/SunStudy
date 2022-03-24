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
  //padding: 100px 0;
  //width: 70vw;
  margin-left: 50px;
  font-family: "Lato", sans-serif;
  font-weight: 1000;
  font-size: 24px;
  //background-color: yellow;
`;

const Myprofile = styled.div`
  display: flex;
  font-size: 36px;
  background-color: black;
  color: white;
  padding: 5px;
`;

const Page_area = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 50px;
  width: 45vw;
`;

const UserPosting = (props) => {
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
    <EditMypage_container>
      <Myprofile>My Postings</Myprofile>
      <Page_area></Page_area>
    </EditMypage_container>
  );
};

export default UserPosting;
