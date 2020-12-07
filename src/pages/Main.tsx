import React, { useEffect } from 'react';
import styled from '../utils/styles/styled';
import Sidebar from '../components/Sidebar/Sidebar';
import Map from '../components/Map/Map';
import { urlToJson } from '../utils/urlParsing';
import useWholeStyle from '../hooks/common/useWholeStyle';
import { WholeStyleActionPayload } from '../store/common/type';

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

function Main({ location: { search } }: MainProps): React.ReactElement {
  const { changeStyle } = useWholeStyle();

  useEffect(() => {
    const states = urlToJson() as WholeStyleActionPayload;

    changeStyle(states);
  }, [search]);

  return (
    <MainWrapper>
      <Sidebar />
      <Map />
    </MainWrapper>
  );
}

export default Main;
