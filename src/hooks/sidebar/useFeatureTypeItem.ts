import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FeatureState } from '../../store/common/type';
import { FeatureNameType } from '../../utils/rendering-data/featureTypeData';

interface useFeatureTypeItemType {
  // 나중에 | 연산으로 다양한 타입으로 수정 필요
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
  ) as FeatureState; // 나중에 다양한 타입으로 수정 필요

  return {
    featureList,
  };
}

export default useFeatureTypeItem;
