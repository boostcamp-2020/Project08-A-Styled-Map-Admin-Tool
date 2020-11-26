import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FeatureNameType } from '../../utils/rendering-data/featureTypeData';
import { CommonType, LabelType } from '../../store/common/commonProperties';

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

function useDetailType({
  featureName,
  subFeatureName,
}: UseDetailTypeProps): UseDetailTypeType {
  const detail = useSelector<RootState>((state) => {
    if (!featureName) {
      return {
        section: null,
        label: null,
      };
    }
    return state[featureName as FeatureNameType][subFeatureName];
  }) as DetailType;

  return {
    detail,
  };
}

export default useDetailType;
