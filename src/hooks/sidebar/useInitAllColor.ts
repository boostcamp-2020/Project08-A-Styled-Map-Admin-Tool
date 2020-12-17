import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { initColors } from '../../store/style/action';
import { getDefaultStyle } from '../../store/style/properties';
import * as mapStyling from '../../utils/map-styling';
import {
  FeatureNameType,
  ElementNameType,
  SubElementNameType,
  StyleType,
  StyleKeyType,
  StyleStoreType,
} from '../../store/common/type';

interface InitAllColorProps {
  features: StyleStoreType;
  feature: FeatureNameType;
  element: ElementNameType;
  subElement: SubElementNameType;
  style: StyleType;
  key: StyleKeyType;
}

interface useInitAllColorHookType {
  initAllColor: (props: InitAllColorProps) => void;
}

function useInitAllColor(): useInitAllColorHookType {
  const dispatch = useDispatch();
  const map = useSelector<RootState>((state) => state.map.map) as mapboxgl.Map;

  const initAllColor = ({
    features,
    feature,
    element,
    subElement,
    style,
    key,
  }: InitAllColorProps) => {
    dispatch(initColors(feature, element, subElement));
    Object.keys(features[feature]).forEach((subFeatureName) => {
      const defaulStyle = getDefaultStyle({
        feature,
        subFeature: subFeatureName,
        element,
        subElement,
      });

      mapStyling[feature]({
        map,
        subFeature: subFeatureName,
        key,
        element,
        subElement,
        style: {
          ...style,
          color: defaulStyle.color,
        },
      });
    });
  };

  return {
    initAllColor,
  };
}

export default useInitAllColor;
