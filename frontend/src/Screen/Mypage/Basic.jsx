import React from "react";
import styled from "styled-components";
import store from "../../store";

const Mypage_container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 100px 0;
  width: 70vw;
  height: 80vh;
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

const Nickname = styled.div`
  padding: 12px;
  font-size: 20px;
  font-weight: 800;
`;

const Aboutme_container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //background-color: green;
  margin-top: 50px;
`;

const Aboutme = styled.div`
  padding: 12px;
  font-size: 16px;
  font-weight: 800;
  width: 50vw;
`;

const Genre_container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //background-color: green;
  margin-top: 50px;
`;

const Genre = styled.div`
  padding: 12px;
  font-size: 18px;
  font-weight: 800;
  display: flex;
`;

const Edit_btn = styled.button`
  border: none;
  color: white;
  background-color: black;
  margin-left: 10px;
  cursor: pointer;
  font-size: 25px;
`;

const Line = styled.div`
  border-bottom: 1px solid grey;
  width: 12vw;
`;

const Menu_page_container = styled.div`
  display: flex;
  padding-right: 200px;
`;

const Menu_area = styled.div`
  width: 150px;
  height: 200px;
  display: flex;
  flex-direction: row;
  padding-right: 150px;
`;

const Page_area = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
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

const Basic = ({ nickname, about_me }) => {
  return (
    <>
      <Mypage_container>
        <Myprofile>My Profile</Myprofile>
        <Page_area>
          <Nickname_container>
            Nickname
            <Line></Line>
            <Nickname>{nickname}</Nickname>
          </Nickname_container>
          <Aboutme_container>
            About me
            <Line></Line>
            <Aboutme defaultValue={about_me}></Aboutme>
          </Aboutme_container>
          <Genre_container>
            Prefer Genre
            <Line></Line>
            <Genre>hiphop</Genre>
          </Genre_container>
        </Page_area>
      </Mypage_container>
    </>
  );
};

export default Basic;
