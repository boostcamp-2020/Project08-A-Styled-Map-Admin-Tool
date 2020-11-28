import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  FeatureNameType,
  FeatureNameOneType,
  FeatureNameMultiType,
  StyleType,
  ElementNameType,
  SubElementNameType,
} from '../../store/common/type';
import { style as dummyStyle } from '../../store/common/properties';

interface UseStyleTypeProps {
  featureName: FeatureNameType;
  subFeatureName: string;
  detailName: ElementNameType;
  subDetailName?: SubElementNameType;
}

export interface UseStyleHookType {
  style: StyleType;
}

function useStyleType({
  featureName,
  subFeatureName,
  detailName,
  subDetailName,
}: UseStyleTypeProps): UseStyleHookType {
  const style = useSelector<RootState>((state) => {
    if (!detailName) {
      return dummyStyle;
    }
    let feature;
    if (featureName === 'water' || featureName === 'marker') {
      feature = state[featureName as FeatureNameOneType];
    } else {
      feature = state[featureName as FeatureNameMultiType][subFeatureName];
    }

    if (detailName === 'labelIcon') return feature.labelIcon;
    return feature[detailName][subDetailName as SubElementNameType];
  }) as StyleType;

  return {
    style,
  };
}

export default useStyleType;
