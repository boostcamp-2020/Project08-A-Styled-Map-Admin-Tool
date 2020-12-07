import React from 'react';
import styled from '../../utils/styles/styled';
import { MapHookType } from '../../hooks/map/useMap';
import useHistoryFeature from '../../hooks/map/useHistoryFeature';
import useCompareFeature from '../../hooks/map/useCompareFeature';

import LowerButtons from './ButtonGroup/LowerButtons';
import UpperButtons from './ButtonGroup/UpperButtons';
import History from './History/History';

const MapsWrapper = styled.div`
  height: 100vh;
  width: calc(100% - 370px);
`;

const CurrentMapWrapper = styled.div`
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

const CompareMapWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;

  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.BLACK};

  // animation: show-from-left 0.4s ease-in-out;

  // @keyframes show-from-left {
  //   0% {
  //     transform: translateX(500px);
  //     opacity: 0;
  //   }

  //   100% {
  //     transform: translateX(0);
  //     opacity: 1;
  //   }
  // }
`;

function Map({ mapRef }: MapHookType): React.ReactElement {
  const { containerRef, beforeMapRef }: MapHookType = useMap();

  const { isHistoryOpen, historyBtnHandler } = useHistoryFeature();
  const { isCompareActive, comparisonButtonClickHandler } = useCompareFeature({
    containerRef,
    beforeMapRef,
  });

  return (
    <MapsWrapper ref={containerRef}>
      {isCompareActive ? <CompareMapWrapper ref={beforeMapRef} /> : <></>}
      <CurrentMapWrapper ref={mapRef}>
        <History
          isHistoryOpen={isHistoryOpen}
          comparisonButtonClickHandler={comparisonButtonClickHandler}
        />
        <UpperButtons
          mapRef={mapRef}
          historyBtnHandler={historyBtnHandler}
        />
        <LowerButtons />
      </CurrentMapWrapper>
    </MapsWrapper>
  );
}

export default Map;
