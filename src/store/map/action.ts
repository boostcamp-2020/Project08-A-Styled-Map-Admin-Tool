import { RefObject } from 'react';

export const INIT_MAP = 'INIT_MAP' as const;

export interface InitActionType {
  type: typeof INIT_MAP;
  payload: {
    mapRef: RefObject<HTMLDivElement>;
  };
}

export const initMap = (mapRef: RefObject<HTMLDivElement>): InitActionType => ({
  type: INIT_MAP,
  payload: { mapRef },
});
