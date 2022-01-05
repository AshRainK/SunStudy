import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

const Mypage_container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 100px 0;
    width: 70vw;
    height: 100vh;
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
    height: 20px;
    padding: 10px;
    font-size: 20px;
    font-weight: 800;
    resize: none;
    font-family: "Lato", sans-serif;
    &:focus{
    outline: none}
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
    &:focus{
        outline: none}
`;

const Genre_container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: green;
    margin-top: 50px;
`;

const Genre = styled.input`
    padding: 10px;

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


const MypageEdit = () => {
    return(
        <Mypage_container>
            <Myprofile>
                Edit My Profile
            </Myprofile>
            <Nickname_container>
                Nickname
                <Line></Line>
                <Nickname></Nickname>
            </Nickname_container>
            <Aboutme_container>
                About me
                <Line></Line>
                <Aboutme></Aboutme>
            </Aboutme_container>
            <Genre_container>
                Prefer Genre
                <Line></Line>
                <Genre type="checkbox" id="cb1" value="pop" name="pop" />
                Pop
                <Genre type="checkbox" id="cb2" value="kpop" name="kpop" />
                K-Pop
                <Genre type="checkbox" id="cb3" value="rock" name="rock" />
                Rock
                <Genre type="checkbox" id="cb4" value="jazz" name="jazz" />
                Jazz
                <Genre type="checkbox" id="cb5" value="hiphop" name="hiphop"/>
                Hiphop
                <Genre type="checkbox" id="cb6" value="disco" name="disco" />
                Disco
                <Genre type="checkbox" id="cb7" value="electronic" name="electronic"/>
                Electronic Music
            </Genre_container>
            <Edit_btn>Modify</Edit_btn>
        </Mypage_container>
    );
};

export default MypageEdit;