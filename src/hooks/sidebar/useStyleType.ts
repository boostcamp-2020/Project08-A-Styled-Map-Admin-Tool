import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { featureNameTypeCheck } from '../../utils/typeCheck';
import {
  FeatureNameType,
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
    if (featureNameTypeCheck(featureName)) {
      feature = state[featureName];
    } else {
      feature = state[featureName][subFeatureName];
    }

    if (detailName === 'labelIcon') return feature.labelIcon;
    return feature[detailName][subDetailName as SubElementNameType];
  }) as StyleType;

  return {
    style,
  };
}

export default useStyleType;
