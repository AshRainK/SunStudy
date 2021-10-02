import React from 'react';
import styled from 'styled-components';

const Hello = styled.div`
  margin: 100px;
`;

const Hello2 = styled.button`
  padding: 20px;
  margin-left: 10px;
`;

const Home = () => {
  return (
    <>
      <Hello>Home</Hello>
      {/* <Hello2>Hello</Hello2> */}
    </>
  );
};

export default Home;
