import React, { useEffect } from 'react';
import styled from '../utils/styles/styled';
import Sidebar from '../components/Sidebar/Sidebar';
import Map from '../components/Map/Map';
import { urlToJson } from '../utils/urlParsing';
import useWholeStyle from '../hooks/common/useWholeStyle';
import { WholeStyleActionPayload } from '../store/common/type';
import { initMap } from '../store/map/action';
import { useDispatch } from 'react-redux';
import useMap from '../hooks/map/useMap';

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

// http://localhost:3000/map?=poi:landmark:labelText:fill:color:white:end
function Main({
  location: { search, pathname },
}: MainProps): React.ReactElement {
  const { changeStyle } = useWholeStyle();
  const dispatch = useDispatch();
  const { mapRef } = useMap();

  const initializeMap = () => {
    if (search && pathname === '/show') {
      const states = urlToJson();
      changeStyle(states as WholeStyleActionPayload);
    }
  };

  useEffect((): void => {
    dispatch(initMap(mapRef, initializeMap));
  }, [search]);

  return (
    <MainWrapper>
      {search && pathname === '/show' ? <></> : <Sidebar />}
      <Map mapRef={mapRef} />
    </MainWrapper>
  );
}

export default Main;
