import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router";

const Body = styled.div`
  width: 100%;
  min-width: 600px;
  min-height: 600px;
`;

const Section_row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 30px 30px 0px 30px;
`;
const Content = styled.button`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 0;
  outline: 0;
  font-family: "Noto Sans KR";
  &:hover {
    cursor: pointer;
  }
`;
const Title = styled.div`
  font-size: 15px;
  font-weight: bolder;
  padding-left: 10px;
  margin-top: 5px;
`;
const Artist = styled.div`
  font-size: 13px;
  font-weight: bolder;
  padding-left: 10px;
  margin-top: 5px;
  color: gray;
`;
const User_and_posttime = styled.div`
  display: flex;
  flex_direction: row;
  margin-top: 5px;
  color: gray;
`;
const User = styled.div`
  font-size: 13px;
  font-weight: bolder;
  padding-left: 10px;
  margin-right: 170px;
`;
const Posttime = styled.div`
  font-size: 13px;
  font-weight: bolder;
  padding: 0px 0px 0px 0px;
`;

const Image_area = styled.div`
  height: 154px;
  width: 273px;
  background-color: black;
  color: white;
  margin: 5px;
`;

const Home = () => {
  const onSubmit = () => {};
  const params = useParams();
  const [title, setTitle] = useState();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/post`).then((response) => {
      console.log(response.data.payroad);
      // setTitle(response.data.payroad.post.title);
    });
  }, [params.post_num]);
  return (
    <Body>
      <Section_row>
        <Content>
          <Image_area></Image_area>
          <Title>{title}</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
        <Content>
          <Image_area></Image_area>
          <Title>{title}</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>일주일 전</Posttime>
          </User_and_posttime>
        </Content>
        <Content>
          <Image_area></Image_area>
          <Title>Watch Me Dance</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
        <Content>
          <Image_area></Image_area>
          <Title>Lost In Paris</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
      </Section_row>
      <Section_row>
        <Content>
          <Image_area></Image_area>
          <Title>South of the river</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
        <Content>
          <Image_area></Image_area>
          <Title>South of the river</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
        <Content>
          <Image_area></Image_area>
          <Title>South of the river</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
        <Content>
          <Image_area></Image_area>
          <Title>South of the river</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
      </Section_row>
      <Section_row>
        <Content>
          <Image_area></Image_area>
          <Title>South of the river</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
        <Content>
          <Image_area></Image_area>
          <Title>South of the river</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
        <Content>
          <Image_area></Image_area>
          <Title>South of the river</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
        <Content>
          <Image_area></Image_area>
          <Title>South of the river</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
      </Section_row>
      <Section_row>
        <Content>
          <Image_area></Image_area>
          <Title>South of the river</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
        <Content>
          <Image_area></Image_area>
          <Title>South of the river</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
        <Content>
          <Image_area></Image_area>
          <Title>South of the river</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
        <Content>
          <Image_area></Image_area>
          <Title>South of the river</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
      </Section_row>
      <Section_row>
        <Content>
          <Image_area></Image_area>
          <Title>South of the river</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
        <Content>
          <Image_area></Image_area>
          <Title>South of the river</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
        <Content>
          <Image_area></Image_area>
          <Title>South of the river</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
        <Content>
          <Image_area></Image_area>
          <Title>South of the river</Title>
          <Artist>Tom Misch</Artist>
          <User_and_posttime>
            <User>USER1</User>
            <Posttime>1일전</Posttime>
          </User_and_posttime>
        </Content>
      </Section_row>
    </Body>
  );
};

export default Home;
