export const INIT_MARKER = 'INIT_MARKER' as const;
export const ADD_MARKER = 'ADD_MARKER' as const;
export const UPDATE_MARKER = 'UPDATE_MARKER' as const;
export const REMOVE_MARKER = 'REMOVE_MARKER' as const;

export enum MarkerKeyType {
  id = 'id',
  lng = 'lng',
  lat = 'lat',
  text = 'text',
  instance = 'instance',
}

export interface MarkerType {
  id: string;
  lng: number;
  lat: number;
  text: string;
  instance?: mapboxgl.Marker;
}

// export interface LocalStorageMarkerType {
//   id: string;
//   lng: number;
//   lat: number;
//   text: string;
// }
export interface MarkerUpdateType {
  id: string;
  lng?: number;
  lat?: number;
  text?: string;
  instance?: mapboxgl.Marker;
}

export interface MarkerState {
  markers: MarkerType[];
}

export interface MarkerActionType {
  type:
    | typeof INIT_MARKER
    | typeof ADD_MARKER
    | typeof UPDATE_MARKER
    | typeof REMOVE_MARKER;
  payload: null | MarkerType | MarkerUpdateType | string;
}

export const initMarker = (): MarkerActionType => ({
  type: INIT_MARKER,
  payload: null,
});

export const addMarker = ({
  id,
  lng,
  lat,
  text,
  instance,
}: MarkerType): MarkerActionType => ({
  type: ADD_MARKER,
  payload: { id, lng, lat, text, instance },
});

export const updateMarker = ({
  id,
  lng,
  lat,
  text,
  instance,
}: MarkerUpdateType): MarkerActionType => ({
  type: UPDATE_MARKER,
  payload: { id, lng, lat, text, instance },
});

export const removeMarker = (id: string): MarkerActionType => ({
  type: REMOVE_MARKER,
  payload: id,
});
