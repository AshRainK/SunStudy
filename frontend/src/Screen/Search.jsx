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
  console.log(params);
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/search/?tl=${params.keyword}`)
      .then((response1) => {
        setPostings(response1.data.payload);
        axios
          .get(
            `${process.env.REACT_APP_SERVER_URL}/search/?arti=${params.keyword}`
          )
          .then((response2) => {
            setPostings([...postings, ...response2.data.payload]);
            axios
              .get(
                `${process.env.REACT_APP_SERVER_URL}/search/?body=${params.keyword}`
              )
              .then((response3) => {
                setPostings([...postings, ...response3.data.payload]);
              });
          });
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
