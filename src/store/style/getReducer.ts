import renderingData from '../../utils/rendering-data/featureTypeData';

import {
  FeatureState,
  FeatureType,
  ActionType,
  SubElementNameType,
  objType,
  ElementNameType,
  SubElementType,
} from '../common/type';
import { getDefaultFeature } from './properties';
import { INIT, SET, SET_WHOLE } from './action';
import { checkStyleIsChanged, checkFeatureIsChanged } from './compareStyle';
import { combineElement } from './manageCategories';

interface ReducerType {
  (state: FeatureState, action: ActionType): FeatureState;
}

export default function getReducer(IDX: number): ReducerType {
  const subFeatures = [
    'all',
    ...(renderingData[IDX].features?.map((v) => v.key) as string[]),
  ];

  const initialState = subFeatures.reduce((acc: FeatureState, cur: string) => {
    acc[cur] = getDefaultFeature({
      feature: renderingData[IDX].typeKey,
      subFeature: cur,
    });
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
        if (feature !== renderingData[IDX].typeKey) return state;

        style.isChanged = checkStyleIsChanged(action.payload);
        const newState: FeatureState = JSON.parse(JSON.stringify(state));
        const newFeature: FeatureType = newState[subFeature as string];

        let prevIsChanged;
        if (element === ElementNameType.labelIcon) {
          prevIsChanged = newFeature[element]?.isChanged;
          newFeature[element] = style;
        } else {
          prevIsChanged = (newFeature[element] as SubElementType)[
            subElement as SubElementNameType
          ].isChanged;
          (newFeature[element] as SubElementType)[
            subElement as SubElementNameType
          ] = style;
        }

        if (prevIsChanged !== style.isChanged) {
          delete (newFeature as objType).isChanged;
          const featureIsChanged = checkFeatureIsChanged(newFeature);
          newFeature.isChanged = featureIsChanged;
        }

        return newState;
      }
      case SET_WHOLE: {
        const inputStyle = action.payload[renderingData[IDX].typeKey];
        const updateStyle = JSON.parse(JSON.stringify(initialState));

        if (!inputStyle) return updateStyle;

        const subFeatures = Object.keys(inputStyle);
        subFeatures.forEach((subFeature) => {
          updateStyle[subFeature] = combineElement({
            elementStyle: inputStyle[subFeature],
            initialElementStyle: updateStyle[subFeature],
          });
        });
        return updateStyle;
      }

      default:
        return state;
    }
  };
}
