import React from "react";
import styled from "styled-components";

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
  return (
    <Posting_page>
      <Posting_page_title>New Post</Posting_page_title>
      <Posting_page_form>
        <Music_title
          type="text"
          name="title"
          placeholder="Title is..."
        ></Music_title>
        <Genre_field>
          <Genre_title>Genres</Genre_title>
          <Checkbox_container>
            <Music_genre type="checkbox" id="cb1" value="pop" name="pop" />
            Pop
            <Music_genre type="checkbox" id="cb2" value="kpop" name="kpop" />
            K-Pop
            <Music_genre type="checkbox" id="cb3" value="rock" name="rock" />
            Rock
            <Music_genre type="checkbox" id="cb4" value="jazz" name="jazz" />
            Jazz
            <Music_genre
              type="checkbox"
              id="cb5"
              value="hiphop"
              name="hiphop"
            />
            Hiphop
            <Music_genre type="checkbox" id="cb6" value="disco" name="disco" />
            Disco
            <Music_genre
              type="checkbox"
              id="cb7"
              value="electronic"
              name="electronic"
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
            ></Music_artist>
          </Music_artist_area>

          <Music_rate_area>
            <Music_rate_title>Rates</Music_rate_title>
            <Music_rate
              type="number"
              min="1"
              max="5"
              step="0.5"
              placeholder=" */5.0"
            ></Music_rate>
          </Music_rate_area>
        </Music_and_rates_area>
        <Music_text
          id="text"
          name="overview"
          placeholder="This music is..."
          maxLength="500"
        ></Music_text>
        <Submit_btn>Submit</Submit_btn>
      </Posting_page_form>
    </Posting_page>
  );
};

export default Postingpage;
