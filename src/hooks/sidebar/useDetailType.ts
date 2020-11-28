import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  FeatureNameType,
  FeatureNameOneType,
  FeatureNameMultiType,
  FeatureType,
} from '../../store/common/type';

interface UseDetailTypeProps {
  featureName: FeatureNameType;
  subFeatureName: string;
}

export interface UseDetailHookType {
  detail: FeatureType;
}

const dummyDetail = {
  section: null,
  label: null,
};

function useDetailType({
  featureName,
  subFeatureName,
}: UseDetailTypeProps): UseDetailHookType {
  const detail = useSelector<RootState>((state) => {
    if (!featureName) {
      return dummyDetail;
    }
    if (featureName === 'water' || featureName === 'marker') {
      return state[featureName as FeatureNameOneType];
    }

    return state[featureName as FeatureNameMultiType][subFeatureName];
  }) as FeatureType;

  return {
    detail,
  };
}

export default useDetailType;
