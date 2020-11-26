import { RefObject, useRef, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { initMap } from '../../store/map/action';

export interface MapHookType {
  mapRef: RefObject<HTMLDivElement>;
}

function useMap(): MapHookType {
  const dispatch = useDispatch();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(initMap(mapRef));
  }, []);

  return {
    mapRef,
  };
}

export default useMap;
