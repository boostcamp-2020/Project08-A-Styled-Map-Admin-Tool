import {
  MarkerType,
  MarkerActionType,
  MarkerState,
  INIT_MARKER,
  ADD_MARKER,
  UPDATE_MARKER,
  REMOVE_MARKER,
} from './action';
import produce from 'immer';
import mapboxgl from 'mapbox-gl';

const initialState = { markers: [] };

const MARKER = 'marker';

function markerReducer(
  state: MarkerState = initialState,
  action: MarkerActionType
): MarkerState {
  switch (action.type) {
    case INIT_MARKER: {
      const storedMarker = JSON.parse(localStorage.getItem(MARKER) as string);

      if (!storedMarker) return initialState;

      const newState = storedMarker.reduce(
        (acc: MarkerType[], marker: MarkerType) => {
          const newMarker = new mapboxgl.Marker({
            draggable: true,
          })
            .setLngLat([marker.lng, marker.lat])
            .setPopup(new mapboxgl.Popup().setHTML(`<p>${marker.text}</p>`));
          acc.push({ ...marker, instance: newMarker });

          return acc;
        },
        []
      );

      return { markers: newState };
    }

    case ADD_MARKER: {
      const { id, lng, lat, text, instance } = action.payload as MarkerType;
      const nextState = produce(state, (draftState) => {
        draftState.markers.push({ id, lng, lat, text, instance });
      });

      let storedMarker = JSON.parse(localStorage.getItem(MARKER) as string);
      if (!storedMarker) storedMarker = [];
      storedMarker.push({
        id,
        text,
        lng,
        lat,
      });

      localStorage.setItem(MARKER, JSON.stringify(storedMarker));

      return nextState;
    }

    case UPDATE_MARKER: {
      const { id, lng, lat } = action.payload as MarkerType;

      const targetIdx = state.markers.findIndex((item) => item.id === id);
      const { text } = state.markers[targetIdx];
      const input = {
        id,
        text,
        lng: lng || state.markers[targetIdx].lng,
        lat: lat || state.markers[targetIdx].lat,
        instance: state.markers[targetIdx].instance,
      };

      const newState = state.markers.map((marker, idx) => {
        return idx === targetIdx ? input : marker;
      });

      const storedMarker = JSON.parse(localStorage.getItem(MARKER) as string);
      storedMarker[targetIdx] = {
        id: input.id,
        text: input.text,
        lng: input.lng,
        lat: input.lat,
      };
      localStorage.setItem(MARKER, JSON.stringify(storedMarker));

      return { markers: newState };
    }

    case REMOVE_MARKER: {
      const newMarkers = state.markers.filter(
        (item) => item.id !== action.payload
      );
      const markerForRemove = state.markers.filter(
        (item) => item.id === action.payload
      );
      markerForRemove[0].instance?.remove();

      const markerForLocalStorage = newMarkers.map((item) => {
        return { id: item.id, text: item.text, lng: item.lng, lat: item.lat };
      });

      localStorage.setItem(MARKER, JSON.stringify(markerForLocalStorage));
      return {
        markers: newMarkers,
      };
    }

    default:
      return state;
  }
}

export default markerReducer;
