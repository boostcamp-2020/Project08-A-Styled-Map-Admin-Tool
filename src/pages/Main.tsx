import React from 'react';
import styled from '../utils/styles/styled';
import Sidebar from '../components/Sidebar/Sidebar';
import Map from '../components/Map/Map';

interface MainProps {
  location: {
    pathname?: string;
    search?: string;
    hash?: string;
    state?: string;
  };
}

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function Main({
  location: { search, pathname },
}: MainProps): React.ReactElement {
  return (
    <MainWrapper>
      {search && pathname === '/show' ? <></> : <Sidebar />}
      <Map pathname={pathname} />
    </MainWrapper>
  );
}

export default Main;
