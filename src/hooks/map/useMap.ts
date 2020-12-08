import { RefObject, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initMap } from '../../store/map/action';
import useWholeStyle from '../../hooks/common/useWholeStyle';
import { urlToJson } from '../../utils/urlParsing';
import { WholeStyleActionPayload } from '../../store/common/type';
import validateStyle from '../../utils/validateStyle';

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

  const { changeStyle } = useWholeStyle();

  const { search, pathname } = window.location;

  const initializeMap = () => {
    if (search && pathname === '/show') {
      const states = urlToJson();
      if (validateStyle(states as WholeStyleActionPayload)) {
        changeStyle(states as WholeStyleActionPayload);
      }
    }
  };

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
