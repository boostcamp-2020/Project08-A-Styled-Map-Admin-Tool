export const INIT_MARKER = 'INIT_MARKER' as const;
export const ADD_MARKER = 'ADD_MARKER' as const;
export const UPDATE_MARKER = 'UPDATE_MARKER' as const;
export const REMOVE_MARKER = 'REMOVE_MARKER' as const;

export const MARKER = 'marker' as const;

export enum MarkerKeyType {
  id = 'id',
  lng = 'lng',
  lat = 'lat',
  text = 'text',
  instance = 'instance',
}

export interface MarkerType {
  lng: number;
  lat: number;
  text: string;
}

export interface MarkerInstanceType extends MarkerType {
  id: string;
  instance?: mapboxgl.Marker;
}

export interface MarkerUpdateType {
  id: string;
  lng?: number;
  lat?: number;
  instance?: mapboxgl.Marker;
}

export interface MarkerState {
  markers: MarkerInstanceType[];
}

export interface MarkerActionType {
  type:
    | typeof INIT_MARKER
    | typeof ADD_MARKER
    | typeof UPDATE_MARKER
    | typeof REMOVE_MARKER;
  payload:
    | MarkerInstanceType[]
    | MarkerInstanceType
    | MarkerUpdateType
    | string;
}

export const initMarker = (
  inputPayload: MarkerInstanceType[]
): MarkerActionType => ({
  type: INIT_MARKER,
  payload: [...inputPayload],
});

export const addMarker = (
  inputPayload: MarkerInstanceType
): MarkerActionType => ({
  type: ADD_MARKER,
  payload: { ...inputPayload },
});

export const updateMarker = (
  inputPayload: MarkerUpdateType
): MarkerActionType => ({
  type: UPDATE_MARKER,
  payload: { ...inputPayload },
});

export const removeMarker = (id: string): MarkerActionType => ({
  type: REMOVE_MARKER,
  payload: id,
});
