import React, { RefObject } from 'react';
import styled from '../../utils/styles/styled';

import LowerButtonsPresenter from './ButtonGroup/LowerButtonsPresenter';

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
  children: React.ReactNode;
}

function MapPresenter({
  mapRef,
  plusZoom,
  minusZoom,
  children,
}: MapPresenterProps): React.ReactElement {
  return (
    <MapWrapper ref={mapRef}>
      {children}
      <LowerButtonsPresenter plusZoom={plusZoom} minusZoom={minusZoom} />
    </MapWrapper>
  );
}

export default MapPresenter;
