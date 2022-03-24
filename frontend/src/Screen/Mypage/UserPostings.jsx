import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Postingcard from "../../Components/Postingcard";

const EditMypage_container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //padding: 100px 0;
  //width: 70vw;
  margin-left: 50px;
  font-family: "Lato", sans-serif;
  font-weight: 1000;
  font-size: 24px;
  //background-color: yellow;
`;

const Myprofile = styled.div`
  display: flex;
  font-size: 36px;
  background-color: black;
  color: white;
  padding: 5px;
`;

const Page_area = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding-left: 350px;
  padding-top: 1000px;
  margin-top: 500px;
  //width: 45vw;
  flex-wrap: wrap;
  //justify-content: space-around;
  //align-content:center;
`;

const UserPosting = (props) => {
  const history = useHistory();
  const params = useParams();
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/post/user`)
      .then((response) => {
        setPostings(response.data.payload);
      });
  }, [params.writer_id]);

  return (
    <EditMypage_container>
      <Myprofile>My Postings</Myprofile>
      <Page_area>
        {postings.map((posting, index) => {
          return <Postingcard {...posting} />;
        })}
      </Page_area>
    </EditMypage_container>
  );
};

export default UserPosting;
