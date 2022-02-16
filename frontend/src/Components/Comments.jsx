import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import store from "../store";

const Comment_container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  font-size: 14pt;
  font-family: "Lato", sans-serif;
  margin: 10px;
  padding: 10px;
`;

//read comments screen
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

//modify screen

const Comment_modifyContainer = styled.div`
  width: 600px;
  height: 120px;
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid black;
`;

const Modifycommentbox = styled.textarea`
  height: 73px;
  border: 1px solid lightgrey;
  outline: none;
  resize: none;
  padding: 10px;
  font-family: "Lato", sans-serif;
  &:focus {
    border: 1px solid grey;
  }
`;

const M_button_container = styled.div`
  display: flex;
  justify-content: right;
`;

const Comment_modify_btn = styled.button`
  width: 60px;
  height: 25px;
  margin: 10px 5px;
  border: none;
  color: white;
  background-color: black;
  cursor: pointer;
`;

const Comment_modify_cancel_btn = styled.button`
  width: 60px;
  height: 25px;
  margin: 10px 5px;
  border: none;
  color: white;
  background-color: black;
  cursor: pointer;
`;

const Comments = (props) => { 
  const{
    nickname,
    comment,
    comment_num,
    written_date,
    setComments,
    commenter,
  } = props;

  const [user, setUser] = useState(store.getState("user").user);
  const [isuser, setIsuser] = useState(true);
  const [isedit, setIsedit] = useState(true);
  const [contents, setContents] = useState(comment);

  const onChange = (e) => {
    e.preventDefault();
    setContents(e.target.value);
  };

  const onDeletecommentClick = () => {
    window.alert("댓글을 삭제하시겠습니까?");
    axios
    .delete(`${process.env.REACT_APP_SERVER_URL}/comment/${comment_num}`, { withCredentials: true })
    .then((response)=>{
      setComments(response.data.payload);
    });
  }  

  const onModifycommentClick = () => {
    setIsedit(!isedit);
  } 

  const onModifycommentsubmitClick = () => {
    window.alert("댓글을 수정하시겠습니까?");
    axios
    .patch(`${process.env.REACT_APP_SERVER_URL}/comment/update`,
    { comment_num, comment: contents } ,{ withCredentials: true })
    .then((response)=>{
      setComments(response.data.payload);
      setIsedit(true);
    });
  }

  const onModifycommentcancelClick = () => {
    window.alert("댓글을 수정을 취소하시겠습니까?");
    setIsedit(true);
  }

  return (
    <Comment_container>
        <Comment_username>{nickname}</Comment_username>
        {isedit ? (
          <>
            {isuser ? (
            <>
              <Comment_content>{comment}</Comment_content>
              <Comment_date>{written_date}</Comment_date>
              {commenter === user ? (
                <>
                 <Comment_func>
                 <Modify
                   onClick = {onModifycommentClick}
                   type = "submit"
                 >수정</Modify>
                 <Delete
                   type = "submit"
                   onClick = {onDeletecommentClick}
                 >삭제</Delete>
               </Comment_func>
              </>
              ):(
                <></>
              )}
              <Comment_func>
                <Modify
                  onClick = {onModifycommentClick}
                  type = "submit"
                >수정</Modify>
                <Delete
                  type = "submit"
                  onClick = {onDeletecommentClick}
                >삭제</Delete>
              </Comment_func>
            </>
          ) : (
            <>
              <Comment_content>{comment}</Comment_content>
              <Comment_date>{written_date}</Comment_date>
            </>
          )}
        </>
        ) : (
          <>
            <Comment_container>
              <Comment_modifyContainer>
                <Modifycommentbox
                    type= "text"
                    value={contents}
                    name = "comment"
                    onChange={onChange}
                    ></Modifycommentbox>
                  <M_button_container>
                    <Comment_modify_btn 
                      type="submit"
                      onClick = {onModifycommentsubmitClick}
                    >수정</Comment_modify_btn>
                    <Comment_modify_cancel_btn 
                      type="button"
                      onClick = {onModifycommentcancelClick}
                    >취소</Comment_modify_cancel_btn>
                  </M_button_container>
              </Comment_modifyContainer>
            </Comment_container>          </>
                )}
    </Comment_container>
  );

};
  
  export default Comments;