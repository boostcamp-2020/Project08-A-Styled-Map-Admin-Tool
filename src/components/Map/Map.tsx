import React from 'react';
import styled from '../../utils/styles/styled';
import 'mapbox-gl-compare/style.css';
import useMap, { MapHookType } from '../../hooks/map/useMap';
import useHistoryFeature from '../../hooks/map/useHistoryFeature';
import useCompareFeature from '../../hooks/map/useCompareFeature';

import LowerButtons from './ButtonGroup/LowerButtons';
import UpperButtons from './ButtonGroup/UpperButtons';
import History from './History/History';
import useMarkerFeature from '../../hooks/map/useMarkerFeature';
import MarkerPopUp from './Marker/MarkerPopup';

interface CurrentMapWrapperProps {
  isPageShow: boolean;
}

const MapsWrapper = styled.div<CurrentMapWrapperProps>`
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100vh;
  width: ${(props) => (props.isPageShow ? '100%' : 'calc(100% - 370px)')};
  overflow: hidden;
`;

const CurrentMapWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100vh;
  width: 100%;
  display: flex;
  flex: 1 1 auto;
  user-select: none;

  canvas {
    outline: none;
  }
`;

const CompareMapWrapper = styled.div`
  position: absolute;
  top: 0;

  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.BLACK};

  canvas {
    outline: none;
  }
`;

interface MapProps {
  pathname?: string;
}

function Map({ pathname }: MapProps): React.ReactElement {
  const { containerRef, afterMapRef, beforeMapRef }: MapHookType = useMap();

  const { isHistoryOpen, historyBtnHandler } = useHistoryFeature();
  const { logId, comparisonButtonClickHandler } = useCompareFeature({
    containerRef,
    beforeMapRef,
  });
  const { markerPosition, resetMarkerPos, registerMarker } = useMarkerFeature();

  return (
    <MapsWrapper ref={containerRef} isPageShow={pathname === '/show'}>
      {logId && <CompareMapWrapper ref={beforeMapRef} />}
      <CurrentMapWrapper ref={afterMapRef} onClick={resetMarkerPos}>
        <MarkerPopUp
          markerPosition={markerPosition}
          resetMarkerPos={resetMarkerPos}
          registerMarker={registerMarker}
        />
      </CurrentMapWrapper>
      <History
        isHistoryOpen={isHistoryOpen}
        comparisonButtonClickHandler={comparisonButtonClickHandler}
        compareId={logId}
      />
      <UpperButtons
        mapRef={containerRef}
        historyBtnHandler={historyBtnHandler}
      />
      <LowerButtons />
    </MapsWrapper>
  );
}

export default Map;
