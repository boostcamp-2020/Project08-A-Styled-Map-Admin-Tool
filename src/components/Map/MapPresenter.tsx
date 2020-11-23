import React, { RefObject } from 'react';
import styled from '../../utils/styles/styled';

import UpperButtonsContainer from './ButtonGroup/UpperButtonsContainer';
import LowerButtonsContainer from './ButtonGroup/LowerButtonsContainer';

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

interface MapPresenterProps {
  mapRef: RefObject<HTMLDivElement>;
  plusZoom: () => void;
  minusZoom: () => void;
  fullscreenHandler: () => void;
  smallscreenHandler: () => void;
}

function MapPresenter({
  mapRef,
  plusZoom,
  minusZoom,
  fullscreenHandler,
  smallscreenHandler,
}: MapPresenterProps): React.ReactElement {
  return (
    <MapWrapper ref={mapRef}>
      <UpperButtonsContainer
        fullscreenHandler={fullscreenHandler}
        smallscreenHandler={smallscreenHandler}
      />
      <LowerButtonsContainer plusZoom={plusZoom} minusZoom={minusZoom} />
    </MapWrapper>
  );
}

export default MapPresenter;
