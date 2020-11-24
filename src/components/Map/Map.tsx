import React from 'react';
import styled from '../../utils/styles/styled';
import useMap, { MapHookType } from '../../hooks/useMap';

import LowerButtons from './ButtonGroup/LowerButtons';
import UpperButtons from './ButtonGroup/UpperButtons';

const MapWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100vh;
  width: calc(100% - 370px);
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  canvas {
    outline: none;
  }
`;

function Map(): React.ReactElement {
  const { mapRef }: MapHookType = useMap();

  return (
    <MapWrapper ref={mapRef}>
      <UpperButtons mapRef={mapRef} />
      <LowerButtons />
    </MapWrapper>
  );
}

export default Map;
