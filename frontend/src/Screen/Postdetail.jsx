import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

const Postdetail_container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  width: 700px;
  font-family: "Lato", sans-serif;
`;

const Music_container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
`;

const Videocontainer = styled.div`
  width: 640px;
  height: 360px;
  margin: 30px 0 20px 0;
  border: 1px solid lightgrey;
`;

const Music_info = styled.div`
  display: flex;
  flex-direction: column;
  width: 620px;
`;

const Songtitle_text = styled.div`
  margin: 15px 0;
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
  border-bottom: 3px solid black;
  margin: 10px 0;
  padding: 20px 0;
`;

const Music_review_info = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const Music_review_date = styled.div`
  font-size: 10px;
`;

const Music_review_user = styled.div`
  display: flex;
  font-size: 10px;
`;

const Comment_wContainer = styled.div`
  width: 650px;
  height: 120px;
  display: flex;
  border-bottom: 2px solid black;
`;

const Commentbox = styled.textarea`
  height: 73px;
  width: 85%;
  border: 1px solid lightgrey;
  outline: none;
  resize: none;
  padding: 10px;
  font-family: "Lato", sans-serif;
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

const Comment_example_container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  font-size: 14pt;
  font-family: "Lato", sans-serif;
  margin: 10px;
  padding: 10px;
`;

const Comment_username = styled.div`
  font-size: 10pt;
  margin-bottom: 5px;
`;

const Comment_content = styled.div`
  font-size: 12pt;
`;

const Comment_date = styled.div`
  display: flex;
  font-size: 10pt;
  justify-content: right;
`;

const Postdetail = () => {
  const params = useParams();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [genre, setGenre ] = useState();
  const [date, setDate] = useState();
  const [nickname, setNickname] = useState();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/post/${params.post_num}`)
      .then((response) => {
        setTitle(response.data.payload.post.title);
        setBody(response.data.payload.post.post_body);
        setGenre(response.data.payload.post.genre);
        setDate(response.data.payload.post.created_date);
        setNickname(response.data.payload.user.nickname);
        console.log(response.data.payload);
      });

      axios
      .get(`http://127.0.0.1:8000/comment/${params.post_num}`)
      .then((response) => {
        setComments(response.data.payload);
        console.log(response.data.payload);
      });

  }, [params.post_num]);


  return (
    <Postdetail_container>
      <Music_container>
        <Videocontainer></Videocontainer>
        <Music_info>
          <Songtitle_text>{title}</Songtitle_text>
          <Singer_text>Slik Sonic</Singer_text>
          <Genre_text>{genre}</Genre_text>
        </Music_info>
      </Music_container>
      <Music_review>
        {body}
        <Music_review_info>
          <Music_review_date>{date}</Music_review_date>
          <Music_review_user>{nickname}</Music_review_user>
        </Music_review_info>
      </Music_review>
      <Comment_wContainer>
        <Commentbox placeholder="NEW COMMENT"></Commentbox>
        <Comment_submit_btn>등록</Comment_submit_btn>
      </Comment_wContainer>
      {comments.map((comment, index)=>{
        return (<Comment_example_container>
          <Comment_username>{c_nickname}</Comment_username>
          <Comment_content>dddddddddddddddddddddddd</Comment_content>
          <Comment_date>2021.11.25</Comment_date>
        </Comment_example_container>);
      })}
    </Postdetail_container>
  );
};

export default Postdetail;
