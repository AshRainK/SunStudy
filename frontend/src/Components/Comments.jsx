import React from "react";
import styled from "styled-components";

const Comment_container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  font-size: 14pt;
  font-family: "Lato", sans-serif;
  margin: 10px;
  padding: 10px;
`;

const Comment_username = styled.div`
  font-size: 10pt;
  margin-bottom: 5px;
`;

const Comment_content = styled.div`
  font-size: 12pt;
`;

const Comment_date = styled.div`
  display: flex;
  font-size: 8pt;
  justify-content: right;
`;

const Comment_func = styled.div`
  display: flex;
  justify-content: right;
`;

const Modify = styled.button`
  padding: 5px;
  font-size: 8pt;
  display: flex;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

const Delete = styled.button`
  padding: 5px;
  font-size: 8pt;
  display: flex;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

const Comments = ({ nickname,comment,written_date }) => { 
    return (
    <Comment_container>
        <Comment_username>{nickname}</Comment_username>
        <Comment_content>{comment}</Comment_content>
        <Comment_date>{written_date}</Comment_date>
        <Comment_func>
          <Modify>수정</Modify>
          <Delete>삭제</Delete>
        </Comment_func>
    </Comment_container>
    );
  };
  
  export default Comments;