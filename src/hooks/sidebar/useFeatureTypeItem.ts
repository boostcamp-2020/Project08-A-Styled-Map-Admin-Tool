import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { PoiType } from '../../store/style/poiReducer';
import { RoadType } from '../../store/style/roadReducer';
import { FeatureNameType } from '../../utils/rendering-data/featureTypeData';

interface useFeatureTypeItemType {
  // 나중에 | 연산으로 다양한 타입으로 수정 필요
  featureList: PoiType | RoadType;
}

export interface useFeatureTypeItemProps {
  featureName: FeatureNameType;
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
