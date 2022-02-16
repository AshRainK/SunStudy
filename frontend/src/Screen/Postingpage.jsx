import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import store from "../store";

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

const Postingpage = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [rating, setRate] = useState(undefined);
  const [overview, setOverview] = useState("");
  const history = useHistory();

  useEffect(()=> {
    if(store.getState("user").user === null){
      history.push({pathname: "/"});
    }
  }, []);

  const onChange = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);

        break;
      case "artist":
        setArtist(e.target.value);

        break;
      case "overview":
        setOverview(e.target.value);

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
    if (overview === "") {
      return window.alert("노래 정보를 입력해주세요");
    }

    axios

      .post(
        `${process.env.REACT_APP_SERVER_URL}/post/create`,
        { title, genre, artist, rating, post_body: overview },
        { withCredentials: true }
      )
      .then((response) => {
        window.alert("글 작성이 정상적으로 처리되었습니다");
        history.push(`/postdetail/${response.data.payload.post_num}`);
      });
  };

  return (
    <Posting_page>
      <Posting_page_title>New Post</Posting_page_title>
      <Posting_page_form>
        <Music_title
          type="text"
          name="title"
          placeholder="Title is..."
          onChange={onChange}
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
              value="HIPHOP"
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
              name="artist"
              placeholder=" Artist is..."
              onChange={onChange}
            ></Music_artist>
          </Music_artist_area>

          <Music_rate_area>
            <Music_rate_title>Rates</Music_rate_title>
            <Music_rate
              onChange={onChange}
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
          name="overview"
          placeholder="This music is..."
          onChange={onChange}
          maxLength="500"
        ></Music_text>
        <Submit_btn onClick={onSubmitPosting}>Submit</Submit_btn>
      </Posting_page_form>
    </Posting_page>
  );
};

export default Postingpage;
