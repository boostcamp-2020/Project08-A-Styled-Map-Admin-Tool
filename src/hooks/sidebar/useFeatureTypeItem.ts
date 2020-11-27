import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FeatureState, FeatureNameType } from '../../store/common/type';

interface useFeatureTypeItemType {
  featureList: FeatureState;
}

export interface useFeatureTypeItemProps {
  featureName: FeatureNameType;
}

function useFeatureTypeItem({
  featureName,
}: useFeatureTypeItemProps): useFeatureTypeItemType {
  const featureList = useSelector<RootState>(
    (state) => state[featureName]
  ) as FeatureState;

  return {
    featureList,
  };
}

export default useFeatureTypeItem;
