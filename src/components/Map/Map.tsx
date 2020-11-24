import React from 'react';
import styled from '../../utils/styles/styled';
import MapHook, { MapHookType } from '../../hooks/useMap';

import LowerButtons from './ButtonGroup/LowerButtons';
import UpperButtons from './ButtonGroup/UpperButtons';

const MapWrapper = styled.div`
  height: 100vh;
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
  const {
    mapRef,
    fullscreenHandler,
    smallscreenHandler,
    plusZoom,
    minusZoom,
  }: MapHookType = MapHook();

  return (
    <MapWrapper ref={mapRef}>
      <UpperButtons
        fullscreenHandler={fullscreenHandler}
        smallscreenHandler={smallscreenHandler}
      />
      <LowerButtons plusZoom={plusZoom} minusZoom={minusZoom} />
    </MapWrapper>
  );
}

export default Map;
