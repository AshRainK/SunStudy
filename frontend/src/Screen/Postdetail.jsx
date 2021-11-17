import React from 'react';
import styled from 'styled-components';

const Postdetail_container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 10px;
    width: 700px;
    font-family: 'Lato', sans-serif;
`;

const Music_container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
`;

const Albumcover = styled.img`
    width: 300px;
    height: 300px;
    margin: 30px 0 20px 0;
`;

const Player_icons = styled.div`
    display: flex;
    width: 300px;
    height: 50px;
    justify-content: space-between;
    align-items: center;
`;

const Player_random = styled.div`
    font-size: 25px;
`;

const Player_play = styled.div`
    font-size: 40px;
`;
const Player_back = styled.div`
    font-size: 25px;
    margin-right: -15px;
`;
const Player_next = styled.div`
    font-size: 25px;
    margin-left: -15px;
`;

const Player_like = styled.div`
    font-size: 25px;
`;

const Music_info = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    left: 1%;
`;

const Songtitle_text = styled.div`
    margin: 20px 0;
    font-size: 18px;
    font-weight: 1000;
`;

const Singer_text = styled.div`
    font-size: 16px;
`;

const Genre_text = styled.div`
    font-size: 14px;
    margin: 15px 0;
`;

const Music_review = styled.div`
    width: 650px;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    border-bottom : 3px solid black;
    margin: 10px 0;
    padding: 20px 0;
`;

const Comment_Container = styled.div`
    width: 650px;
    height: 120px;
    display: flex;
    border-bottom: 2px solid black;
`;

const Comment = styled.textarea`
    height: 73px;
    width: 85%;
    border: 1px solid lightgrey;
    outline: none;
    resize: none;
    padding: 10px;
    font-family: 'Lato', sans-serif;
    &:focus {
        border: 1px solid grey;
      }
`;

const Comment_submit_btn = styled.button`
    width: 15%;
    height: 95px;
    border: none;
    color: white;
    background-color: black;
    cursor: pointer;
    &:active {
        border: 1px solid grey;
    }
`;

const Postdetail = () => {
    return (
        <Postdetail_container>
            <Music_container>
                <Albumcover></Albumcover>
                <Player_icons>
                    <Player_random><i class="fas fa-random"></i></Player_random>
                    <Player_back><i class="fas fa-step-backward"></i></Player_back>
                    <Player_play><i class="fas fa-play-circle"></i></Player_play>
                    <Player_next><i class="fas fa-step-forward"></i></Player_next>
                    <Player_like><i class="fas fa-heart"></i></Player_like>
                </Player_icons>
                <Music_info>
                    <Songtitle_text>Smokin Out the Window</Songtitle_text>
                    <Singer_text>Slik Sonic</Singer_text>
                    <Genre_text>R&B</Genre_text>
                </Music_info>
            </Music_container>
            <Music_review>
                Supervillains Harley Quinn, Bloodsport, Peacemaker and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.
            </Music_review>
            <Comment_Container>
                <Comment placeholder="NEW COMMENT"></Comment>
                <Comment_submit_btn>등록</Comment_submit_btn>
            </Comment_Container>
        </Postdetail_container>
    );
  };

  export default Postdetail;