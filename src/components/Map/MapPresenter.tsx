import React, { RefObject } from 'react';
import styled from '../../utils/styles/styled';

import UpperButtonsContainer from './ButtonGroup/UpperButtons/UpperButtonsContainer';

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
}

function MapPresenter({ mapRef }: MapPresenterProps): React.ReactElement {
  return (
    <MapWrapper ref={mapRef}>
      <UpperButtonsContainer />
    </MapWrapper>
  );
}

export default MapPresenter;
