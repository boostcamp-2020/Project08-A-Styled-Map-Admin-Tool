import renderingData from '../../utils/rendering-data/featureTypeData';

import { FeatureState, ActionType, SubElementNameType } from './type';
import { getDefaultFeature } from './properties';
import { INIT, SET } from './action';

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

  return function reducer(
    state: FeatureState = initialState,
    action: ActionType
  ): FeatureState {
    switch (action.type) {
      case INIT:
        return initialState;
      case SET: {
        const {
          feature,
          subFeature,
          element,
          subElement,
          style,
        } = action.payload;
        if (feature === renderingData[IDX].typeKey) return state;

        const newState: FeatureState = JSON.parse(JSON.stringify(state));

        if (element === 'labelIcon') {
          newState[subFeature as string][element] = style;
          return newState;
        }

        newState[subFeature as string][element][
          subElement as SubElementNameType
        ] = style;
        return newState;
      }
      default:
        return state;
    }
  };
}
