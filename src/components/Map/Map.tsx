import React from 'react';
import styled from '../../utils/styles/styled';
import 'mapbox-gl-compare/style.css';
import useMap, { MapHookType } from '../../hooks/map/useMap';
import useHistoryMap from '../../hooks/map/useHistoryMap';
import useCompareFeature from '../../hooks/map/useCompareFeature';

import LowerButtons from './ButtonGroup/LowerButtons';
import UpperButtons from './ButtonGroup/UpperButtons';
import History from './History/History';
import useMarkerFeature from '../../hooks/map/useMarkerPosition';
import MarkerPopUp from './Marker/MarkerPopup';
import { URLPathNameType } from '../../store/common/type';

interface CurrentMapWrapperProps {
  isPageShow: boolean;
}

interface CompareMapWrapperProps {
  isOpened: boolean;
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

const CompareMapWrapper = styled.div<CompareMapWrapperProps>`
  position: absolute;
  top: 0;

  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.BLACK};
  display: ${(props) => (props.isOpened ? 'block' : 'hidden')};

  canvas {
    outline: none;
  }
`;

interface MapProps {
  pathname?: string;
}

function Map({ pathname }: MapProps): React.ReactElement {
  const { markerPosition, resetMarkerPos, markerLngLat } = useMarkerFeature();
  const { containerRef, afterMapRef, beforeMapRef }: MapHookType = useMap();

  const { isHistoryOpen, historyBtnHandler } = useHistoryMap();
  const { logId, setLogId, comparisonButtonClickHandler } = useCompareFeature({
    containerRef,
    beforeMapRef,
  });

  return (
    <MapsWrapper
      ref={containerRef}
      isPageShow={pathname === URLPathNameType.show}
    >
      <CompareMapWrapper ref={beforeMapRef} isOpened={!logId} />
      <CurrentMapWrapper ref={afterMapRef} onClick={resetMarkerPos}>
        <MarkerPopUp
          markerPosition={markerPosition}
          resetMarkerPos={resetMarkerPos}
          markerLngLat={markerLngLat}
        />
      </CurrentMapWrapper>
      <History
        isHistoryOpen={isHistoryOpen}
        comparisonButtonClickHandler={comparisonButtonClickHandler}
        compareId={logId}
        setLogId={setLogId}
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
