import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router";
import PostingCard from "../Components/Postingcard";

const Body = styled.div`
  margin-top: 50px;
  width: 1200px;
  min-width: 600px;
  min-height: 600px;
  display: flex;
  flex-wrap: wrap;
`;

const Search = () => {
  const onSubmit = () => {};
  const params = useParams();
  const [postings, setPostings] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/search/?arti=${params.keyword}`)
      .then((response) => {
        setPostings(response.data.payload);
      });
  }, [params.keyword]);

  return (
    <Body>
      {postings.map((posting, index) => {
        return <PostingCard {...posting} />;
      })}
    </Body>
  );
};

export default Search;
