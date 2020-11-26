import renderingData from '../../utils/rendering-data/featureTypeData';

import { FeatureState } from './type';
import { getLabel, getSection } from './commonProperties';
import {
  INIT,
  SET_SECTION,
  SET_LABEL_TEXT,
  SET_LABEL_ICON,
  ActionType,
} from './action';

interface ReducerType {
  (state: FeatureState, action: ActionType): FeatureState;
}

export default function getReducer(IDX: number): ReducerType {
  const subFeatures = [
    'all',
    ...(renderingData[IDX].features?.map((v) => v.key) as string[]),
  ];

  const initialState = subFeatures.reduce((acc: FeatureState, cur: string) => {
    acc[cur] = {
      isChanged: false,
      section: getSection(),
      label: getLabel(),
    };
    return acc;
  }, {});

  return function reducer(
    state: FeatureState = initialState,
    action: ActionType
  ): FeatureState {
    switch (action.type) {
      case INIT:
        return initialState;
      case SET_SECTION: {
        const { feature, element, style } = action.payload;
        const newState = JSON.parse(JSON.stringify(state));
        newState[feature].section[element as string] = style;

        return newState;
      }
      case SET_LABEL_TEXT: {
        const { feature, element, style } = action.payload;
        const newState = JSON.parse(JSON.stringify(state));
        newState[feature].label.text[element as string] = style;

        return newState;
      }
      case SET_LABEL_ICON: {
        const { feature, style } = action.payload;
        const newState = JSON.parse(JSON.stringify(state));
        newState[feature].icon = style;

        return newState;
      }
      default:
        return state;
    }
  };
}
