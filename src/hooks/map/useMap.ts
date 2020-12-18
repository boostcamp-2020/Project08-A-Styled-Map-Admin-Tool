// Dependencies
import { RefObject, useRef, useEffect, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { initMarker, MarkerState } from '../../store/marker/action';
import { initHistory } from '../../store/history/action';
import { RootState } from '../../store/index';
import { initMap } from '../../store/map/action';

// Util
import { getInitialMarkersFromLocalStorage } from '../../utils/updateMarkerStorage';
import { urlToJson } from '../../utils/urlParsing';
import validateStyle from '../../utils/validateStyle';

// Hook
import useMarkerRegister from './useMarkerRegister';
import useWholeStyle from '../common/useWholeStyle';

// Type
import {
  WholeStyleActionPayload,
  HistoryState,
  LocationType,
  URLPathNameType,
} from '../../store/common/type';

export interface MapHookType {
  containerRef: RefObject<HTMLDivElement>;
  afterMapRef: RefObject<HTMLDivElement>;
  beforeMapRef: RefObject<HTMLDivElement>;
}

interface ReduxStateType {
  history: HistoryState;
  marker: MarkerState;
}

function useMap(): MapHookType {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const afterMapRef = useRef<HTMLDivElement>(null);
  const beforeMapRef = useRef<HTMLDivElement>(null);
  const {
    history: { log, currentIdx },
    marker,
  } = useSelector<RootState>((state) => ({
    history: state.history,
    marker: state.marker,
  })) as ReduxStateType;

  const { changeStyle, replaceStyle } = useWholeStyle();
  const { registerMarker } = useMarkerRegister();
  const [flag, setFlag] = useState(false);
  const { pathname } = window.location;

  const initializeMap = (map: mapboxgl.Map): void => {
    const { filteredStyle, mapCoordinate } = urlToJson();

    if (validateStyle(filteredStyle as WholeStyleActionPayload)) {
      changeStyle(filteredStyle as WholeStyleActionPayload);
    } else {
      // eslint-disable-next-line no-alert
      alert('URL에 잘못된 속성이 포함되어 있습니다.');
    }

    if (mapCoordinate) {
      const { zoom, lng, lat } = mapCoordinate as LocationType;
      if (zoom && lng && lat) {
        map.setCenter({ lng, lat });
        map.setZoom(zoom);
      }
    }

    if (pathname !== URLPathNameType.show) {
      dispatch(initHistory());
    }

    const storedMarkers = getInitialMarkersFromLocalStorage();
    dispatch(initMarker(storedMarkers));

    setFlag(true);
  };

  const printMarker = (): void => {
    if (!marker) return;
    marker.markers.forEach((item) => {
      registerMarker({
        id: item.id,
        text: item.text,
        lngLat: { lng: item.lng, lat: item.lat },
        instance: item.instance as mapboxgl.Marker,
      });
    });
  };

  useEffect(() => {
    if (!flag) return;
    if (log && log.length) {
      const { wholeStyle } = log[currentIdx as number];
      if (wholeStyle) replaceStyle(wholeStyle);
    }

    if (marker && marker.markers.length) {
      printMarker();
    }
    setFlag(false);
  }, [flag]);

  useEffect(() => {
    dispatch(initMap(afterMapRef, initializeMap));
  }, []);

  return {
    containerRef,
    afterMapRef,
    beforeMapRef,
  };
}

export default useMap;
