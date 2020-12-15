import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { RootState } from '../../store';
import {
  SubElementType,
  StyleType,
  StyleKeyType,
  ColorSubStyleType,
  StyleDefaultKeyType,
  ElementNameType,
  SubElementNameType,
  ReduxStateType,
  StyleStoreType,
} from '../../store/common/type';
import { setStyle, initColors } from '../../store/style/action';
import * as mapStyling from '../../utils/map-styling';

import { hexToHSL, hslToHEX } from '../../utils/colorFormat';
import { VisibilityType } from '../../utils/applyStyle';
import { getDefaultStyle } from '../../store/style/properties';
import removeNullFromObject from '../../utils/removeNullFromObject';
import deepCopy from '../../utils/deepCopy';
import { addLog } from '../../store/history/action';

export interface UseStyleHookType {
  styleElement: StyleType;
  onStyleChange: (key: StyleDefaultKeyType, value: string | number) => void;
  element: ElementNameType | null;
  subFeature: string | null;
}

const getNewColorStyle = (
  key: StyleDefaultKeyType,
  value: string | number,
  styleElement: StyleType
) => {
  let { color } = styleElement;
  if (color === 'transparent') color = '#000000';
  const { h: beforeColor, s: beforeSaturation, l: beforeLight } = hexToHSL(
    color
  );

  switch (key) {
    case ColorSubStyleType.saturation:
      color = hslToHEX(`hsl(${beforeColor}, ${value}%, ${beforeLight}%)`);
      break;

    case ColorSubStyleType.lightness:
      color = hslToHEX(`hsl(${beforeColor}, ${beforeSaturation}%, ${value}%)`);
      break;

    default:
      break;
  }

  return color;
};

interface changedObjType {
  key?: StyleDefaultKeyType;
  value?: string | number;
}

function useStyleType(): UseStyleHookType {
  const dispatch = useDispatch();
  const [changedObj, setChangedObj] = useState<changedObjType>({});
  const {
    map,
    sidebar: { feature, subFeature, element, subElement },
    features,
  } = useSelector<RootState>((state) => {
    const { map, sidebar, history, depthTheme, marker, ...features } = state;
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
      const info = {
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
        wholeStyle: removeNullFromObject(deepCopy(features)) as StyleStoreType,
      };
      dispatch(addLog(info));
      setChangedObj({});
    }
  }, [changedObj]);

  const onStyleChange = useCallback(
    (key: StyleDefaultKeyType, value: string | number) => {
      if (!feature || !subFeature || !element || !map) return;
      const initColor = 'init' as const;

      /** 한개의 초기 색상을 바꿀 때 , 가시성 상속 표기 */
      let initialColor = '';
      if (value === initColor && subElement) {
        const style = getDefaultStyle({
          feature,
          subFeature,
          element,
          subElement,
        });
        initialColor = style.color;
      }

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

      let newStyleKey: StyleKeyType;
      let newStyleValue = initialColor || value;

      if (
        key === ColorSubStyleType.saturation ||
        key === ColorSubStyleType.lightness
      ) {
        newStyleKey = StyleKeyType.color;
        newStyleValue = getNewColorStyle(
          key,
          initialColor || value,
          styleElement
        );
      } else newStyleKey = key;

      const newStyleObj = { [newStyleKey]: newStyleValue };

      /** all의 색상을 바꿀 때 */
      if (value === initColor && subFeature === 'all' && subElement) {
        dispatch(initColors(feature, element, subElement));
        Object.keys(features[feature]).forEach((subFeatureName) => {
          const style = getDefaultStyle({
            feature,
            subFeature: subFeatureName,
            element,
            subElement,
          });

          mapStyling[feature]({
            map,
            subFeature: subFeatureName,
            key: newStyleKey,
            element,
            subElement: subElement as SubElementNameType,
            style: {
              ...styleElement,
              ...newStyleObj,
              color: style.color,
            },
          });
        });
        setChangedObj({
          key,
          value,
        });
        return;
      }

      /** 한개의 색상을 바꿀 때 */
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

      mapStyling[feature]({
        map,
        subFeature,
        key: newStyleKey,
        element,
        subElement: subElement as SubElementNameType,
        style: {
          ...styleElement,
          ...newStyleObj,
          [newStyleKey]: parentVisibility || initialColor || newStyleValue,
        },
      });
      setChangedObj({
        key,
        value: initialColor || parentVisibility || value,
      });
    },
    [feature, subFeature, element, subElement, styleElement]
  );

  return {
    styleElement,
    onStyleChange,
    subFeature,
    element,
  };
}

export default useStyleType;
