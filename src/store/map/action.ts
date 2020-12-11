import { RefObject } from 'react';

export const INIT_MAP = 'INIT_MAP' as const;

export interface InitActionType {
  type: typeof INIT_MAP;
  payload: {
    mapRef: RefObject<HTMLDivElement>;
    initializeMap: (map: mapboxgl.Map) => void;
  };
}

export const initMap = (
  mapRef: RefObject<HTMLDivElement>,
  initializeMap: (map: mapboxgl.Map) => void
): InitActionType => ({
  type: INIT_MAP,
  payload: { mapRef, initializeMap },
});
