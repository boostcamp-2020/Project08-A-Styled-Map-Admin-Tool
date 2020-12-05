import React from 'react';
import styled from '../../utils/styles/styled';
import useMap, { MapHookType } from '../../hooks/map/useMap';

import LowerButtons from './ButtonGroup/LowerButtons';
import UpperButtons from './ButtonGroup/UpperButtons';
import History from './History/History';

const MapWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100vh;
  width: calc(100% - 370px);
  display: flex;
  flex: 1 1 auto;

  canvas {
    outline: none;
  }
`;

function Map(): React.ReactElement {
  const { mapRef }: MapHookType = useMap();

  return (
    <MapWrapper ref={mapRef}>
      <UpperButtons mapRef={mapRef} />
      <History />
      <LowerButtons />
    </MapWrapper>
  );
}

export default Map;
