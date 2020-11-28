import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../../store';
import { featureNameTypeCheck } from '../../utils/typeCheck';
import {
  FeatureNameType,
  StyleType,
  ElementNameType,
  SubElementNameType,
} from '../../store/common/type';
import { setStyle } from '../../store/common/action';
import { style as dummyStyle } from '../../store/common/properties';

interface UseStyleTypeProps {
  featureName: FeatureNameType;
  subFeatureName: string;
  detailName: ElementNameType;
  subDetailName?: SubElementNameType;
}

export interface UseStyleHookType {
  styleElement: StyleType;
  onStyleChange: (key: string, value: string | number) => void;
}

function useStyleType({
  featureName,
  subFeatureName,
  detailName,
  subDetailName,
}: UseStyleTypeProps): UseStyleHookType {
  const dispatch = useDispatch();

  const styleElement = useSelector<RootState>((state) => {
    if (!detailName) {
      return dummyStyle;
    }
    let feature;
    if (featureNameTypeCheck(featureName)) {
      feature = state[featureName];
    } else {
      feature = state[featureName][subFeatureName];
    }

    if (detailName === 'labelIcon') return feature.labelIcon;
    return feature[detailName][subDetailName as SubElementNameType];
  }) as StyleType;

  const onStyleChange = useCallback(
    (key: string, value: string | number) => {
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
