import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router";

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

const Image_area = styled.img`
  height: 154px;
  width: 273px;
  margin: 5px;
`;

const Postingcard = (props) => {
  const {
    title,
    artist,
    genre,
    post_num,
    created_date,
    nickname,
    post_body,
    user_id,
    writer_id,
    updated_date,
  } = props;
  const onSubmit = () => {};
  const history = useHistory();
  const onPostingClicked = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/post`).then((response) => {
      history.push(`/postdetail/${post_num}`);
    });
  };

  return (
    <Content onClick={onPostingClicked}>
      <Image_area src={`./img/${genre}360200.png`}></Image_area>
      <Title>{title}</Title>
      <Artist>{artist}</Artist>
      <User_and_posttime>
        <User>USER1</User>
        <Posttime>1일전</Posttime>
      </User_and_posttime>
    </Content>
  );
};

export default Postingcard;
