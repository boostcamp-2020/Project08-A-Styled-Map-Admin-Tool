import mapboxgl from 'mapbox-gl';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../../store';
import {
  StyleType,
  StyleKeyType,
  ElementNameType,
  SubElementNameType,
  PayloadPropsType,
} from '../../store/common/type';
import { setStyle } from '../../store/style/action';
import * as mapStyling from '../../utils/map-styling';

export interface UseStyleHookType {
  styleElement: StyleType;
  onStyleChange: (key: StyleKeyType, value: string | number) => void;
  element: ElementNameType | null;
}

function useStyleType(): UseStyleHookType {
  const dispatch = useDispatch();

  const { feature, subFeature, element, subElement } = useSelector<RootState>(
    (state) => state.sidebar
  ) as PayloadPropsType;
  const map = useSelector<RootState>((state) => state.map.map) as mapboxgl.Map;
  const styleElement = useSelector<RootState>((state) => {
    if (!feature || !subFeature || !element) {
      return null;
    }

    const newFeature = state[feature][subFeature];
    if (element === ElementNameType.labelIcon) return newFeature[element];
    return newFeature[element][subElement as SubElementNameType];
  }) as StyleType;

  const onStyleChange = useCallback(
    (key: StyleKeyType, value: string | number) => {
      if (!feature || !subFeature || !element) return;

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
          subElement: subElement as SubElementNameType,
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
    element,
  };
}

export default useStyleType;
