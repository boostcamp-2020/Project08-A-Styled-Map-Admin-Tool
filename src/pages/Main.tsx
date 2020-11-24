import React from 'react';
import styled from '../utils/styles/styled';
import Sidebar from '../components/Sidebar/Sidebar';
import Map from '../components/Map/Map';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function Main(): React.ReactElement {
  return (
    <MainWrapper>
      <Sidebar />
      <Map />
    </MainWrapper>
  );
}

export default Main;
