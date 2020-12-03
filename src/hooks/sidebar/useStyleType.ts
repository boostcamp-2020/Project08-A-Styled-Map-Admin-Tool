import mapboxgl from 'mapbox-gl';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../../store';
import {
  StyleType,
  StyleKeyType,
  ElementNameType,
  SubElementNameType,
  ElementPropsType,
} from '../../store/common/type';
import { setStyle } from '../../store/style/action';
import { getDefaultStyle } from '../../store/style/properties';
import * as mapStyling from '../../utils/map-styling';

export interface UseStyleHookType {
  styleElement: StyleType;
  onStyleChange: (key: StyleKeyType, value: string | number) => void;
}

function useStyleType({
  feature,
  subFeature,
  element,
  subElement,
}: ElementPropsType): UseStyleHookType {
  const dispatch = useDispatch();

  const map = useSelector<RootState>((state) => state.map.map) as mapboxgl.Map;
  const styleElement = useSelector<RootState>((state) => {
    if (!element) {
      return getDefaultStyle({
        feature,
        subFeature,
        element,
        subElement,
      });
    }
    const newFeature = state[feature][subFeature];
    if (element === ElementNameType.labelIcon) return newFeature[element];
    return newFeature[element][subElement as SubElementNameType];
  }) as StyleType;

  const onStyleChange = useCallback(
    (key: StyleKeyType, value: string | number) => {
      mapStyling[feature]({
        map,
        subFeature,
        key,
        element,
        subElement: subElement as SubElementNameType,
        style: {
          ...styleElement,
          [key]: value,
        },
      });

      dispatch(
        setStyle({
          feature,
          subFeature,
          element,
          subElement,
          style: {
            ...styleElement,
            [key]: value,
          },
        })
      );
    },
    [feature, subFeature, element, subElement, styleElement]
  );

  return {
    styleElement,
    onStyleChange,
  };
}

export default useStyleType;
