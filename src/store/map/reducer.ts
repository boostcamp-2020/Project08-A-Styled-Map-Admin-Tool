import { InitActionType, INIT_MAP } from './action';
import mapboxgl from 'mapbox-gl';
import initializeMap from './initializeMap';

export interface MapType {
  map: mapboxgl.Map | null;
}

const initialState: MapType = {
  map: null,
};

function mapReducer(
  state: MapType = initialState,
  action: InitActionType
): MapType {
  switch (action.type) {
    case INIT_MAP: {
      const map = initializeMap({
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
