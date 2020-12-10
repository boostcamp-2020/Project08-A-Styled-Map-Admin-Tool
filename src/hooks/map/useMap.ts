import { RefObject, useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initMap } from '../../store/map/action';
import useWholeStyle from '../../hooks/common/useWholeStyle';
import { urlToJson } from '../../utils/urlParsing';
import {
  WholeStyleActionPayload,
  HistoryPropsType,
  LocationType,
} from '../../store/common/type';
import validateStyle from '../../utils/validateStyle';
import { RootState } from '../../store/index';
import useHistoryFeature from './useHistoryFeature';

export interface MapHookType {
  containerRef: RefObject<HTMLDivElement>;
  afterMapRef: RefObject<HTMLDivElement>;
  beforeMapRef: RefObject<HTMLDivElement>;
}

function useMap(): MapHookType {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const afterMapRef = useRef<HTMLDivElement>(null);
  const beforeMapRef = useRef<HTMLDivElement>(null);
  const { log, currentIdx } = useSelector<RootState>(
    (state) => state.history
  ) as HistoryPropsType;

  const { changeStyle, replaceStyle } = useWholeStyle();
  const { initHistoryStatus } = useHistoryFeature();
  const [flag, setFlag] = useState(false);
  const { search, pathname } = window.location;

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
    initHistoryStatus();
    setFlag(true);
  };

  useEffect(() => {
    if (flag && log && log.length) {
      const { wholeStyle } = log[currentIdx as number];
      if (wholeStyle) replaceStyle(wholeStyle);
      setFlag(false);
    }
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
