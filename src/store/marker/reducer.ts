import {
  MarkerType,
  MarkerActionType,
  MarkerState,
  INIT_MARKER,
  ADD_MARKER,
  UPDATE_MARKER,
  REMOVE_MARKER,
} from './action';

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
      return storedMarker;
    }

    case ADD_MARKER: {
      const newState = JSON.parse(JSON.stringify(state));
      const input = action.payload as MarkerType;
      newState.markers.push(input);

      // TODO:Converting circular structure to JSON Error 처리
      let storedMarker = JSON.parse(localStorage.getItem(MARKER) as string);
      if (!storedMarker) storedMarker = { markers: [] };
      storedMarker.markers.push({ ...input, instance: null });
      localStorage.setItem(MARKER, JSON.stringify(storedMarker));

      return newState;
    }

    case UPDATE_MARKER: {
      const { id, text, lng, lat, instance } = action.payload as MarkerType;
      const newState: MarkerState = JSON.parse(JSON.stringify(state));
      const targetIdx = newState.markers.findIndex((item) => item.id === id);

      const input = {
        id,
        text: text && newState.markers[targetIdx].text,
        lng: lng && newState.markers[targetIdx].lng,
        lat: lat && newState.markers[targetIdx].lat,
        instance: instance && newState.markers[targetIdx].instance,
      };

      newState.markers[targetIdx] = JSON.parse(
        JSON.stringify(input)
      ) as MarkerType;

      // TODO:Converting circular structure to JSON Error 처리
      const storedMarker = JSON.parse(localStorage.getItem(MARKER) as string);
      storedMarker.markers[targetIdx] = { ...input, instance: null };
      localStorage.setItem(MARKER, JSON.stringify(newState));

      return newState;
    }

    case REMOVE_MARKER: {
      const newMarkers = state.markers.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem(
        MARKER,
        JSON.stringify({
          markers: newMarkers,
        })
      );
      return {
        markers: newMarkers,
      };
    }

    default:
      return state;
  }
}

export default markerReducer;
