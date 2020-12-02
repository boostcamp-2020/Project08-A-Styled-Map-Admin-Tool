import mapboxgl from 'mapbox-gl';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../../store';
import {
  FeatureNameType,
  StyleType,
  StyleKeyType,
  ElementNameType,
  SubElementNameType,
} from '../../store/common/type';
import { setStyle } from '../../store/style/action';
import { getDefaultStyle } from '../../store/style/properties';
import * as mapStyling from '../../utils/map-styling';

interface UseStyleTypeProps {
  featureName: FeatureNameType;
  subFeatureName: string;
  detailName: ElementNameType;
  subDetailName?: SubElementNameType;
}

export interface UseStyleHookType {
  styleElement: StyleType;
  onStyleChange: (key: StyleKeyType, value: string | number) => void;
}

function useStyleType({
  featureName,
  subFeatureName,
  detailName,
  subDetailName,
}: UseStyleTypeProps): UseStyleHookType {
  const dispatch = useDispatch();

  const map = useSelector<RootState>((state) => state.map.map) as mapboxgl.Map;
  const styleElement = useSelector<RootState>((state) => {
    if (!detailName) {
      return getDefaultStyle();
    }
    const feature = state[featureName][subFeatureName];
    if (detailName === ElementNameType.labelIcon) return feature[detailName];
    return feature[detailName][subDetailName as SubElementNameType];
  }) as StyleType;

  const onStyleChange = useCallback(
    (key: StyleKeyType, value: string | number) => {
      mapStyling[featureName]({
        map,
        subFeatureName,
        key,
        detailName,
        subDetailName: subDetailName as SubElementNameType,
        style: {
          ...styleElement,
          [key]: value,
        },
      });

      dispatch(
        setStyle({
          feature: featureName,
          subFeature: subFeatureName,
          element: detailName,
          subElement: subDetailName,
          style: {
            ...styleElement,
            [key]: value,
          },
        })
      );
    },
    [featureName, subFeatureName, detailName, subDetailName, styleElement]
  );

  return {
    styleElement,
    onStyleChange,
  };
}

export default useStyleType;
