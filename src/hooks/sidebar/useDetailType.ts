import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { featureNameTypeCheck } from '../../utils/typeCheck';
import { FeatureNameType, FeatureType } from '../../store/common/type';

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
    if (featureNameTypeCheck(featureName)) {
      return state[featureName];
    }

    return state[featureName][subFeatureName];
  }) as FeatureType;

  return {
    detail,
  };
}

export default useDetailType;
