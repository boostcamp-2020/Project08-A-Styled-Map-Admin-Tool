import { RefObject, useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initMap } from '../../store/map/action';
import useWholeStyle from '../../hooks/common/useWholeStyle';
import { urlToJson } from '../../utils/urlParsing';
import {
  WholeStyleActionPayload,
  HistoryPropsType,
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
  history: HistoryPropsType;
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
  const { initHistoryStatus } = useHistoryFeature();
  const [flag, setFlag] = useState(false);
  const { search, pathname } = window.location;

  const initializeMap = (): void => {
    if (search && pathname === '/show') {
      const states = urlToJson();
      if (validateStyle(states as WholeStyleActionPayload)) {
        changeStyle(states as WholeStyleActionPayload);
      }
      return;
    }
    dispatch(initHistory());
    dispatch(initMarker());
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
