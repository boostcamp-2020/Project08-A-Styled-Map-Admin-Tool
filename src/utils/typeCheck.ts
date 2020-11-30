import { FeatureNameType, FeatureNameSingleType } from '../store/common/type';

export function featureNameTypeCheck(
  name: FeatureNameType
): name is FeatureNameSingleType {
  if (name === 'water' || name === 'marker') return true;
  return false;
}
