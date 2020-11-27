import renderingData from '../../utils/rendering-data/featureTypeData';

import { FeatureState } from './type';
import { getDefaultFeature } from './properties';
import { INIT, SET, ActionType } from './action';

interface ReducerType {
  (state: FeatureState, action: ActionType): FeatureState;
}

export default function getReducer(IDX: number): ReducerType {
  const subFeatures = [
    'all',
    ...(renderingData[IDX].features?.map((v) => v.key) as string[]),
  ];

  const initialState = subFeatures.reduce((acc: FeatureState, cur: string) => {
    acc[cur] = getDefaultFeature();
    return acc;
  }, {});

  const featureTypes = renderingData[IDX].features.map((v) => v.key);

  return function reducer(
    state: FeatureState = initialState,
    action: ActionType
  ): FeatureState {
    switch (action.type) {
      case INIT:
        return initialState;
      case SET: {
        const { feature, element, subElement, style } = action.payload;
        if (!featureTypes.includes(feature)) return state;

        const newState = JSON.parse(JSON.stringify(state));

        if (element === 'labelIcon') {
          newState[feature][element] = style;
          return newState;
        }

        newState[feature][element][subElement as string] = style;
        return newState;
      }
      default:
        return state;
    }
  };
}
