import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  FeatureState,
  FeatureNameType,
  SidebarState,
} from '../../store/common/type';

interface useFeatureTypeItemType {
  featureList: FeatureState;
  feature: FeatureNameType | null;
  subFeature: string | null;
}

export interface useFeatureTypeItemProps {
  featureName: FeatureNameType;
}

function useFeatureTypeItem({
  featureName,
}: useFeatureTypeItemProps): useFeatureTypeItemType {
  const { feature, subFeature } = useSelector<RootState>(
    (state) => state.sidebar
  ) as SidebarState;
  const featureList = useSelector<RootState>(
    (state) => state[featureName]
  ) as FeatureState;

  return {
    featureList,
    feature,
    subFeature,
  };
}

export default useFeatureTypeItem;
