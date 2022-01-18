import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import Comments from "../Components/Comments";

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
  font-size: 12px;
`;

const Posting_func = styled.div`
  display: flex;
  justify-content: right;
`;

const Posting_modify = styled.button`
  padding: 15px;
  font-size: 10pt;
  display: flex;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

const Posting_delete = styled.button`
  padding: 15px 0;
  font-size: 10pt;
  display: flex;
  border: 0;
  background-color: transparent;
  cursor: pointer;
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

const Postdetail = () => {
  const params = useParams();

  const [title, setTitle] = useState();
  const [artist, setArtist] = useState();
  const [body, setBody] = useState();
  const [genre, setGenre] = useState();
  const [date, setDate] = useState();
  const [nickname, setNickname] = useState();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/post/${params.post_num}`)
      .then((response) => {
        const { title, artist, post_body, genre, created_date } =
          response.data.payload.post;
        setTitle(title);
        setArtist(artist);
        setBody(post_body);
        setGenre(genre);
        setDate(created_date);
        setNickname(response.data.payload.user.nickname);
      });

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/comment/${params.post_num}`)
      .then((response) => {
        setComments(response.data.payload);
      });
  }, [params.post_num]);

  const onCreateCommentButtonClick = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/comment/create`,
        {
          comment,
          post_num: params.post_num,
        },
        { withCredentials: true }
      )
      .then((response) => {
        setComments(response.data.payload);
      });
  };

  return (
    <Postdetail_container>
      <Music_container>
        <Videocontainer></Videocontainer>
        <Music_info>
          <Songtitle_text>{title}</Songtitle_text>
          <Singer_text>{artist}</Singer_text>
          <Genre_text>{genre}</Genre_text>
        </Music_info>
      </Music_container>
      <Music_review>
        {body}
        <Music_review_info>
          <Music_review_date>{date}</Music_review_date>
          <Music_review_user>{nickname}</Music_review_user>
        </Music_review_info>
        <Posting_func>
          <Posting_modify>수정</Posting_modify>
          <Posting_delete>삭제</Posting_delete>
        </Posting_func>
      </Music_review>
      <Comment_wContainer>
        <Commentbox
          placeholder="WRITE COMMENT"
          onChange={onChange}
          value={comment}
        ></Commentbox>
        <Comment_submit_btn type="submit" onClick={onCreateCommentButtonClick}>
          등록
        </Comment_submit_btn>
      </Comment_wContainer>
      {comments.map((comment, index) => {
        return <Comments {...comment} />;
      })}
    </Postdetail_container>
  );
};

export default Postdetail;
