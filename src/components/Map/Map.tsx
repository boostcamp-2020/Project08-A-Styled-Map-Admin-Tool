import React from 'react';
import styled from '../../utils/styles/styled';
import useMap, { MapHookType } from '../../hooks/map/useMap';
import useComparisonButton, {
  ComparisonType,
} from '../../hooks/map/useComparisonButton';

import LowerButtons from './ButtonGroup/LowerButtons';
import UpperButtons from './ButtonGroup/UpperButtons';

const MapsWrapper = styled.div`
  height: 100vh;
  width: calc(100% - 370px);
`;

const CurrentMapWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100vh;
  width: 100%;
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  canvas {
    outline: none;
  }
`;

const CompareMapWrapper = styled.div<ComparisonType>`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;

  display: ${({ isComparisonToggle }) =>
    isComparisonToggle ? 'absolute' : 'none'};
  width: 400px;
  height: 100%;
  background-color: #222;

  animation: show-from-right 0.4s ease-in-out;

  @keyframes show-from-right {
    0% {
      transform: translateX(500px);
      opacity: 0;
      background-color: #eeeeee;
    }

    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

function Map(): React.ReactElement {
  const { mapRef }: MapHookType = useMap();
  const {
    isComparisonToggle,
    comparisonButtonClickHandler,
    afterMapRef,
    comparisonMapRef,
  } = useComparisonButton(mapRef);

  return (
    <MapsWrapper ref={comparisonMapRef}>
      <CurrentMapWrapper ref={mapRef}>
        <UpperButtons
          mapRef={mapRef}
          comparisonButtonClickHandler={comparisonButtonClickHandler}
        />
        <LowerButtons />
      </CurrentMapWrapper>
      <CompareMapWrapper
        ref={afterMapRef}
        isComparisonToggle={isComparisonToggle}
      />
    </MapsWrapper>
  );
}

export default Map;
