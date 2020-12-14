import { InitActionType, INIT_MAP } from './action';
import mapboxgl from 'mapbox-gl';
import initializingMap from './initializeMap';

export interface MapState {
  map: mapboxgl.Map | null;
}

const initialState: MapState = {
  map: null,
};

function mapReducer(
  state: MapState = initialState,
  action: InitActionType
): MapState {
  switch (action.type) {
    case INIT_MAP: {
      const map = initializingMap({
        mapRef: action.payload.mapRef,
        initializeMap: action.payload.initializeMap,
      });
      return {
        ...state,
        map,
      };
    }
    default:
      return state;
  }
}

export default mapReducer;
