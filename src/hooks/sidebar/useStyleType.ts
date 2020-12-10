import mapboxgl from 'mapbox-gl';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { RootState } from '../../store';
import {
  SubElementType,
  StyleType,
  StyleKeyType,
  ElementNameType,
  SubElementNameType,
  PayloadPropsType,
  HistoryPropsType,
  StyleStoreType,
} from '../../store/common/type';
import { setStyle } from '../../store/style/action';
import * as mapStyling from '../../utils/map-styling';

import { hexToHSL, hslToHEX } from '../../utils/colorFormat';
import useHistoryFeature from '../map/useHistoryFeature';
import { VisibilityType } from '../../utils/applyStyle';

export interface UseStyleHookType {
  styleElement: StyleType;
  onStyleChange: (key: StyleKeyType, value: string | number) => void;
  element: ElementNameType | null;
}

const colorRelatedKeysArr: StyleKeyType[] = [
  StyleKeyType.color,
  StyleKeyType.lightness,
  StyleKeyType.saturation,
];

const getNewColorStyle = (
  key: StyleKeyType,
  value: string | number,
  styleElement: StyleType
) => {
  const { color, saturation, lightness } = styleElement;
  const newStyleObj = {
    color,
    saturation,
    lightness,
  };

  const { h: beforeColor, s: beforeSaturation, l: beforeLight } = hexToHSL(
    color
  );

  switch (key) {
    case StyleKeyType.saturation:
      newStyleObj.saturation = value as number;
      newStyleObj.color = hslToHEX(
        `hsl(${beforeColor}, ${value}%, ${beforeLight}%)`
      );
      break;

    case StyleKeyType.lightness:
      newStyleObj.lightness = value as number;
      newStyleObj.color = hslToHEX(
        `hsl(${beforeColor}, ${beforeSaturation}%, ${value}%)`
      );
      break;

    case StyleKeyType.color:
      // eslint-disable-next-line no-case-declarations
      const { s: newSaturation, l: newLightness } = hexToHSL(value as string);
      newStyleObj.color = value as string;
      newStyleObj.saturation = newSaturation;
      newStyleObj.lightness = newLightness;
      break;

    default:
      break;
  }

  return newStyleObj;
};

interface changedObjType {
  key?: StyleKeyType;
  value?: string | number;
}

interface ReduxStateType {
  map: mapboxgl.Map;
  sidebar: PayloadPropsType;
  history: HistoryPropsType;
  features: StyleStoreType;
}

function useStyleType(): UseStyleHookType {
  const dispatch = useDispatch();
  const [changedObj, setChangedObj] = useState<changedObjType>({});
  const { addHistory } = useHistoryFeature();
  const {
    map,
    sidebar: { feature, subFeature, element, subElement },
    features,
  } = useSelector<RootState>((state) => {
    const { map, sidebar, history, ...features } = state;
    return {
      map: map.map,
      sidebar,
      features,
    };
  }) as ReduxStateType;

  const styleElement = useSelector<RootState>((state) => {
    if (!feature || !subFeature || !element) {
      return null;
    }

    const newFeature = state[feature][subFeature];
    if (element === ElementNameType.labelIcon) return newFeature[element];
    return newFeature[element][subElement as SubElementNameType];
  }) as StyleType;

  useEffect(() => {
    const { key, value } = changedObj;
    if (key && value && feature && subFeature && element) {
      addHistory({
        changedKey: key,
        changedValue: value,
        feature,
        subFeature,
        element,
        subElement: subElement as SubElementNameType,
        style: {
          ...styleElement,
          [key]: value,
        },
        wholeStyle: features,
      });

      setChangedObj({});
    }
  }, [changedObj]);

  const onStyleChange = useCallback(
    (key: StyleKeyType, value: string | number) => {
      if (!feature || !subFeature || !element || !map) return;

      const newStyleObj = colorRelatedKeysArr.includes(key)
        ? getNewColorStyle(key, value, styleElement)
        : { [key]: value };

      dispatch(
        setStyle({
          feature,
          subFeature,
          element,
          subElement: subElement as SubElementNameType,
          style: {
            ...styleElement,
            ...newStyleObj,
          },
        })
      );

      let parentVisibility = '';
      if (value === VisibilityType.inherit) {
        if (subElement) {
          parentVisibility = (features[feature].all[element] as SubElementType)[
            subElement
          ].visibility;
        } else {
          parentVisibility = (features[feature].all[element] as StyleType)
            .visibility;
        }
      }

      mapStyling[feature]({
        map,
        subFeature,
        key,
        element,
        subElement: subElement as SubElementNameType,
        style: {
          ...styleElement,
          ...newStyleObj,
          [key]: parentVisibility || value,
        },
      });

      setChangedObj({ key, value });
    },
    [feature, subFeature, element, subElement, styleElement]
  );

  return {
    styleElement,
    onStyleChange,
    element,
  };
}

export default useStyleType;
