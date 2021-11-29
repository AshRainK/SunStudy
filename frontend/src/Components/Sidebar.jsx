import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
const Sidebar_Container = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  z-index: 2;
  width: 100%;
  height: 100%;
  color: white;
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
`;

const Sidebar_open = keyframes`
  0% { transform: translateX(-250px); }
  100% { transform: translateX(0px); }
`;

const Sidebar_Main = styled.div`
  animation: ${Sidebar_open} 0.2s ease-in-out;
  width: 265px;
  height: 100%;
  background: rgb(0, 0, 0);
`;
const Sidebar_blank = styled.div`
  width: 100%;
  height: 100%;
`;

const Sidebar_Button_Container = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 50px;
  align-items: center;
  margin-right: 20px;
`;

const Genre_Title = styled.div`
  margin-left: 30px;
  font-size: 20px;
`;

const Genre_list = styled.ul``;

const Genre_item = styled.li`
  margin: 5px 20px;
  list-style: circle;
`;

const Genre_link = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Sidebar = ({ onSidebarToggleButtonClicked }) => {
  return (
    <Sidebar_Container>
      <Sidebar_Main>
        <Sidebar_Button_Container>
          <i
            className="fas fa-times"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              console.log('Clicked');
            }}
            onClick={onSidebarToggleButtonClicked}
          ></i>
        </Sidebar_Button_Container>
        <Genre_Title>Genre</Genre_Title>
        <Genre_list>
          <Genre_item>
            <Genre_link to="/genre/kpop" onClick={onSidebarToggleButtonClicked}>
              K-pop
            </Genre_link>
          </Genre_item>
          <Genre_item>
            <Genre_link to="/genre/disco" onClick={onSidebarToggleButtonClicked}>
              Disco
            </Genre_link>
          </Genre_item>
          <Genre_item>
            <Genre_link to="/genre/jazz" onClick={onSidebarToggleButtonClicked}>
              Jazz
            </Genre_link>
          </Genre_item>
          <Genre_item>
            <Genre_link to="/genre/electronic" onClick={onSidebarToggleButtonClicked}>
              Electronic Music
            </Genre_link>
          </Genre_item>
          <Genre_item>
            <Genre_link to="/genre/pop" onClick={onSidebarToggleButtonClicked}>
              Pop
            </Genre_link>
          </Genre_item>
          <Genre_item>
            <Genre_link to="/genre/rock" onClick={onSidebarToggleButtonClicked}>
              Rock
            </Genre_link>
          </Genre_item>
        </Genre_list>
      </Sidebar_Main>
      <Sidebar_blank onClick={onSidebarToggleButtonClicked} />
    </Sidebar_Container>
  );
};

export default Sidebar;
