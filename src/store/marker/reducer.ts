import {
  MarkerInstanceType,
  MarkerActionType,
  MarkerState,
  INIT_MARKER,
  ADD_MARKER,
  UPDATE_MARKER,
  REMOVE_MARKER,
} from './action';
import produce from 'immer';

const initialState = { markers: [] };

function markerReducer(
  state: MarkerState = initialState,
  action: MarkerActionType
): MarkerState {
  switch (action.type) {
    case INIT_MARKER:
      return { markers: [...(action.payload as MarkerInstanceType[])] };

    case ADD_MARKER: {
      const {
        id,
        lng,
        lat,
        text,
        instance,
      } = action.payload as MarkerInstanceType;
      const nextState = produce(state, (draftState) => {
        draftState.markers.push({ id, lng, lat, text, instance });
      });
      return nextState;
    }

    case UPDATE_MARKER: {
      const { id, lng, lat } = action.payload as MarkerInstanceType;

      const { markers } = state;
      const target = markers.find((item) => item.id === id);

      const changedTarget = {
        ...target,
        lng: lng ?? target?.lng,
        lat: lat ?? target?.lat,
      } as MarkerInstanceType;

      const newState: MarkerInstanceType[] = [...markers]
        .filter((marker) => marker.id !== id)
        .concat([changedTarget]);

      return { markers: newState };
    }

    case REMOVE_MARKER: {
      const newMarkers = state.markers.filter(
        (item) => item.id !== action.payload
      );
      return { markers: newMarkers };
    }

    default:
      return state;
  }
}

export default markerReducer;
