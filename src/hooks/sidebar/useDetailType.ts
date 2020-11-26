import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  FeatureNameType,
  FeatureNameOneType,
} from '../../utils/rendering-data/featureTypeData';
import { CommonType, LabelType } from '../../store/common/properties';

interface DetailType {
  section: CommonType;
  label: LabelType;
}

interface UseDetailTypeProps {
  featureName: string;
  subFeatureName: string;
}

interface UseDetailTypeType {
  detail: DetailType;
}

const dummyDetail = {
  section: null,
  label: null,
};

function useDetailType({
  featureName,
  subFeatureName,
}: UseDetailTypeProps): UseDetailTypeType {
  const detail = useSelector<RootState>((state) => {
    if (!featureName) {
      return dummyDetail;
    }
    if (featureName === 'water' || featureName === 'marker') {
      return state[featureName as FeatureNameOneType];
    }

    return state[featureName as FeatureNameType][subFeatureName];
  }) as DetailType;

  return {
    detail,
  };
}

export default useDetailType;
