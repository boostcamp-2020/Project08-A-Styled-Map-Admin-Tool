import { RefObject, useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initMap } from '../../store/map/action';
import useWholeStyle from '../../hooks/common/useWholeStyle';
import useMarkerFeature from '../../hooks/map/useMarkerFeature';
import { urlToJson } from '../../utils/urlParsing';
import {
  WholeStyleActionPayload,
  HistoryState,
  LocationType,
} from '../../store/common/type';
import validateStyle from '../../utils/validateStyle';
import { RootState } from '../../store/index';
import { initMarker, MarkerState } from '../../store/marker/action';
import { initHistory } from '../../store/history/action';

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
  const [flag, setFlag] = useState(false);
  const { search, pathname } = window.location;
  const { registerMarker } = useMarkerFeature();

  const initializeMap = (map: mapboxgl.Map): void => {
    if (search && pathname === '/show') {
      const states = urlToJson();

      // 이부분에 문제가 있는 것 같습니다. 없애면 에러 안나고 잘 되는데 있으면 안되요
      // if (validateStyle(states.filteredStyle as WholeStyleActionPayload)) {
      changeStyle(states.filteredStyle as WholeStyleActionPayload);
      // }
      const { zoom, lng, lat } = states.mapCoordinate as LocationType;
      if (zoom && lng && lat) {
        map.setCenter({ lng, lat });
        map.setZoom(zoom);
      }
      return;
    }
    dispatch(initHistory());
    dispatch(initMarker());
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
