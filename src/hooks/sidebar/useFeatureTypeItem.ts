import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  FeatureState,
  FeatureNameType,
  PayloadPropsType,
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
  ) as PayloadPropsType;
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
