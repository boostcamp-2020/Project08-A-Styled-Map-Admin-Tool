import { getDefaultFeature } from '../common/properties';
import { FeatureType, ActionType, SubElementNameType } from '../common/type';
import { INIT, SET } from '../common/action';

const initialState = getDefaultFeature();

export default function markerReducer(
  state: FeatureType = initialState,
  action: ActionType
): FeatureType {
  switch (action.type) {
    case INIT:
      return initialState;
    case SET: {
      const { feature, element, subElement, style } = action.payload;
      if (feature !== 'marker') return state;

      const newState = JSON.parse(JSON.stringify(state));

      if (element === 'labelIcon') {
        newState[element] = style;
        return newState;
      }

      newState[element][subElement as SubElementNameType] = style;
      return newState;
    }
    default:
      return state;
  }
}
