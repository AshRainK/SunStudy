import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Comments from "../Components/Comments";
import store from "../store";

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

const Rating = styled.div`
  display: flex;
  justify-content: right;
`;

const Rating_star = styled.div`
  margin-right: 15px;
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
  margin-top: 30px;
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

// 게시글 수정

const Posting_page = styled.div`
  background-color: #f5f5f5;
  width: 700px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  margin: 20px;
`;

const Posting_page_title = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-weight: 600;
  font-size: 30px;
  font-family: "Noto Sans KR";
`;

const Posting_page_form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Music_title = styled.input`
  margin-top: 30px;
  width: 650px;
  height: 40px;
  font-size: 20px;
`;
const Genre_field = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Genre_title = styled.div`
  font-size: 20px;
  font-weight: 1000;
`;

const Checkbox_container = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Music_genre = styled.input`
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: row;
  margin-left: 10px;
`;
const Music_and_rates_area = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-around;
`;
const Music_artist_area = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const Music_artist_title = styled.div`
  width: 50px;
`;
const Music_artist = styled.input`
  width: 250px;
  height: 35px;
  font-size: 20px;
`;
const Music_rate_area = styled.div`
  display: flex;
  flex-direction: column;
`;
const Music_rate_title = styled.div``;
const Music_rate = styled.input`
  width: 250px;
  height: 35px;
  font-size: 20px;
`;
const Music_text = styled.textarea`
  margin-top: 50px;
  width: 650px;
  height: 150px;
  font-size: 20px;
  font-family: "Noto Sans KR";
  resize: none;
`;
const Submit_btn = styled.button`
  width: 15%;
  height: 50px;
  margin: 20px 0px 0px 530px;
  border: none;
  color: white;
  background-color: black;
  cursor: pointer;
  &:active {
    border: 1px solid grey;
  }
`;

const Postdetail = () => {
  const history = useHistory();
  const params = useParams();

  const [title, setTitle] = useState();
  const [artist, setArtist] = useState();
  const [body, setBody] = useState("");
  const [genre, setGenre] = useState();
  const [date, setDate] = useState();
  const [nickname, setNickname] = useState();
  const [rating, setRate] = useState(undefined);
  const [post_num, setPostNum] = useState();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const [userData, setUserData] = useState(null);

  const [isedit, setIsedit] = useState(true);
  const [isuser, setIsuser] = useState(true);

  //게시글 수정 onchange
  const onChange = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);

        break;
      case "artist":
        setArtist(e.target.value);

        break;
      case "body":
        setBody(e.target.value);

        break;
      case "genre":
        setGenre(e.target.value);

        break;
      case "rating":
        var value = e.target.value;
        if (value > 5) value = 5;
        else if (value < 0) value = 1;
        setRate(value);

        break;
    }
  };

  const onSubmitPosting = (e) => {
    e.preventDefault();
    if (title === "") {
      return window.alert("노래 제목을 입력해주세요");
    }
    if (genre === "") {
      return window.alert("장르를 선택해주세요");
    }
    if (artist === "") {
      return window.alert("아티스트 정보를 입력해주세요");
    }

    if (rating === undefined) {
      return window.alert("평점을 입력해주세요");
    }
    if (body === "") {
      return window.alert("노래 정보를 입력해주세요");
    }

    window.alert("해당 포스트를 수정하시겠습니까?");
    axios
    .patch(`${process.env.REACT_APP_SERVER_URL}/post/update`,
    { 
      post_num,
      title,
      artist,
      post_body: body,
      genre
    } ,{ withCredentials: true })
    .then((response)=>{
      setIsedit(true);
    });
  };

  useEffect(() => {
    let user = store.getState("user");
    if (user === null) {
      setUserData(null);
    } else {
      setUserData(user.user);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/post/${params.post_num}`)
      .then((response) => {
        const { title, artist, post_body, genre, created_date, rating, nickname } =
          response.data.payload;
        setTitle(title);
        setArtist(artist);
        setBody(post_body);
        setGenre(genre);
        setDate(created_date);
        setRate(rating);
        setNickname(nickname);
      });

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/comment/${params.post_num}`)
      .then((response) => {
        setComments(response.data.payload);
      });
  }, [params.post_num]);

  //포스트 삭제
  const onDeletepostClick = () => {
    const confirm = window.confirm("해당 포스트를 삭제하시겠습니까?");
    if(confirm){
      axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/post/${params.post_num}`,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        history.push("/");
      });
    }
  };

  //포스트 수정 버튼 클릭
  const onModifypostClick = () => {
    setIsedit(!isedit);
  } 

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
      {isedit ? (
      <>
        <Music_container>
        <Videocontainer></Videocontainer>
        <Music_info>
          <Songtitle_text>{title}</Songtitle_text>
          <Singer_text>{artist}</Singer_text>
          <Genre_text>{genre}</Genre_text>
          <Rating><Rating_star><i class="fas fa-star"></i></Rating_star>{rating} / 5</Rating>
        </Music_info>
      </Music_container>
      <Music_review>
        {body}
        <Music_review_info>
          <Music_review_date>{date}</Music_review_date>
          <Music_review_user>{nickname}</Music_review_user>
        </Music_review_info>
        <Posting_func>
          <Posting_modify onClick={onModifypostClick}>수정</Posting_modify>
          <Posting_delete onClick={onDeletepostClick}>
            삭제
          </Posting_delete>
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
        return <Comments {...comment} setComments={setComments} />;
      })}
      </>
      ) : (
      <>
        <Posting_page>
      <Posting_page_title>Edit Post</Posting_page_title>
      <Posting_page_form>
        <Music_title
          type="text"
          name="title"
          placeholder="Title is..."
          onChange={onChange}
          value={title}
        ></Music_title>
        <Genre_field>
          <Genre_title>Genres</Genre_title>
          <Checkbox_container>
            <Music_genre
              onChange={onChange}
              type="radio"
              id="cb1"
              value="POP"
              name="genre"
            />
            Pop
            <Music_genre
              onChange={onChange}
              type="radio"
              id="cb2"
              value="KPOP"
              name="genre"
            />
            K-Pop
            <Music_genre
              onChange={onChange}
              type="radio"
              id="cb3"
              value="ROCK"
              name="genre"
            />
            Rock
            <Music_genre
              onChange={onChange}
              type="radio"
              id="cb4"
              value="JAZZ"
              name="genre"
            />
            Jazz
            <Music_genre
              onChange={onChange}
              type="radio"
              id="cb5"
              value="HIP-HOP"
              name="genre"
            />
            Hiphop
            <Music_genre
              onChange={onChange}
              type="radio"
              id="cb6"
              value="DISCO"
              name="genre"
            />
            Disco
            <Music_genre
              type="radio"
              id="cb7"
              value="ELECTRONIC"
              name="genre"
            />
            Electronic Music
          </Checkbox_container>
        </Genre_field>
        <Music_and_rates_area>
          <Music_artist_area>
            <Music_artist_title>Artist</Music_artist_title>
            <Music_artist
              type="text"
              value={artist}
              name="artist"
              placeholder=" Artist is..."
              onChange={onChange}
            ></Music_artist>
          </Music_artist_area>

          <Music_rate_area>
            <Music_rate_title>Rates</Music_rate_title>
            <Music_rate
              onChange={onChange}
              value={rating}
              type="number"
              min={1}
              max={5}
              step={0.5}
              name="rating"
              value={rating}
              placeholder=" */5.0"
            ></Music_rate>
          </Music_rate_area>
        </Music_and_rates_area>
        <Music_text
          id="text"
          name="body"
          value={body}
          placeholder="This music is..."
          onChange={onChange}
          maxLength="500"
        ></Music_text>
        <Submit_btn onClick={onSubmitPosting}>Submit</Submit_btn>
      </Posting_page_form>
    </Posting_page>
      </>)}
    </Postdetail_container>
  );
};

export default Postdetail;
