import { RefObject, useRef } from 'react';

export interface MapHookType {
  mapRef: RefObject<HTMLDivElement>;
}

function useMap(): MapHookType {
  const mapRef = useRef<HTMLDivElement>(null);

  return {
    mapRef,
  };
}

export default useMap;
