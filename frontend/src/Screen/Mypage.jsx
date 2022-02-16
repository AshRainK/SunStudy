import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory} from 'react-router-dom';
import axios from "axios";
import store from "../store";

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
    width:12vw;
`;


const Mypage = () => {
    const history = useHistory();
    const onEditCliked = () => {
      history.push('/mypageedit');
    };

      useEffect(()=> {
    if(store.getState("user").user === null){
      history.push({pathname: "/"});
    }
  }, []);

    console.log();
    const [nickname, setNickname] = useState();
    const [aboutme, setAboutme] = useState([]);
    

    return(
        <Mypage_container>
            <Myprofile>
                My Profile
                <Edit_btn onClick={onEditCliked}><i class="fas fa-edit"></i></Edit_btn>
            </Myprofile>
            <Nickname_container>
                Nickname
                <Line></Line>
                <Nickname>Qkrco</Nickname>
            </Nickname_container>
            <Aboutme_container>
                About me
                <Line></Line>
                <Aboutme>Joe Gardner is a middle school teacher with a love for jazz music. After a successful gig at the Half Note Club</Aboutme>
            </Aboutme_container>
            <Genre_container>
                Prefer Genre
                <Line></Line>
                <Genre>hiphop</Genre>
            </Genre_container>
        </Mypage_container>
    );
};

export default Mypage;