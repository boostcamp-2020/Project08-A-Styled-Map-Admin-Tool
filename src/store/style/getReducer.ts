/* eslint-disable no-restricted-syntax */
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
import { getDefaultFeature, getDefaultStyle } from './properties';
import { INIT, SET, SET_WHOLE, REPLACE_WHOLE, INIT_COLORS } from './action';
import { checkStyleIsChanged, checkFeatureIsChanged } from './compareStyle';
import { combineElement } from './manageCategories';

interface ReducerType {
  (state: FeatureState, action: ActionType): FeatureState;
}

export default function getReducer(IDX: number): ReducerType {
  const featureName = renderingData[IDX].typeKey;
  const subFeatures = [
    'all',
    ...(renderingData[IDX].subFeatures?.map((v) => v.key) as string[]),
  ];

  const initialState = subFeatures.reduce((acc: FeatureState, cur: string) => {
    acc[cur] = getDefaultFeature({
      feature: featureName,
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

      case REPLACE_WHOLE:
        return action.payload[featureName];

      case SET: {
        const {
          feature,
          subFeature,
          element,
          subElement,
          style,
        } = action.payload;

        if (feature !== featureName) return state;

        const defaultStyle = getDefaultStyle(action.payload);
        style.isChanged = checkStyleIsChanged({ defaultStyle, style });

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
        const inputStyle = action.payload[featureName];
        const updateStyle = JSON.parse(JSON.stringify(initialState));

        if (!inputStyle) return updateStyle;

        const subFeatures = Object.keys(inputStyle);
        subFeatures.forEach((subFeature) => {
          const newFeature = combineElement({
            elementStyle: inputStyle[subFeature],
            initialElementStyle: updateStyle[subFeature],
          });
          updateStyle[subFeature] = {
            ...newFeature,
            isChanged: checkFeatureIsChanged(newFeature),
          };
        });

        return updateStyle;
      }

      case INIT_COLORS: {
        const { feature, element, subElement } = action.payload;
        if (feature !== featureName) return state;
        const newState: FeatureState = JSON.parse(JSON.stringify(state));

        Object.keys(newState).forEach((subFeature) => {
          const defaultStyle = getDefaultStyle({
            feature,
            subElement,
            element,
            subFeature,
          });

          const style = (newState[subFeature][element] as SubElementType)[
            subElement
          ];
          style.color = defaultStyle.color;
          style.isChanged = checkStyleIsChanged({ defaultStyle, style });
        });
        delete (newState.all as objType).isChanged;
        newState.all.isChanged = checkFeatureIsChanged(newState.all);

        return newState;
      }
      default:
        return state;
    }
  };
}
