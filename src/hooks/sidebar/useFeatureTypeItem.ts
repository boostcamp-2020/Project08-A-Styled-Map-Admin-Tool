import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { PoiType } from '../../store/style/poiReducer';
import {
  FeatureNameType,
  FeatureNameOneType,
} from '../../utils/rendering-data/featureTypeData';

interface useFeatureTypeItemType {
  // 나중에 | 연산으로 다양한 타입으로 수정 필요
  featureList: PoiType;
}

export interface useFeatureTypeItemProps {
  featureName: FeatureNameType | FeatureNameOneType;
}

function useFeatureTypeItem({
  featureName,
}: useFeatureTypeItemProps): useFeatureTypeItemType {
  const featureList = useSelector<RootState>(
    (state) => state[featureName]
  ) as PoiType; // 나중에 다양한 타입으로 수정 필요

  return {
    featureList,
  };
}

export default useFeatureTypeItem;
