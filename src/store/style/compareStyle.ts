import { getDefaultStyle } from './properties';
import {
  StyleType,
  StyleKeyType,
  objType,
  FeatureNameType,
  ElementNameType,
  SubElementNameType,
} from '../common/type';

interface CheckStyleIsChangedProps {
  targetStyle: StyleType;
  featureName: FeatureNameType;
  subFeatureName: string;
  elementName: ElementNameType;
  subElementName?: SubElementNameType;
}

export function checkStyleIsChanged({
  targetStyle,
  featureName,
  subFeatureName,
  elementName,
  subElementName,
}: CheckStyleIsChangedProps): boolean {
  const defaultStyle: StyleType = getDefaultStyle({
    featureName,
    subFeatureName,
    elementName,
    subElementName,
  });
  const keys = Object.keys(defaultStyle) as StyleKeyType[];

  const filteredKeys = keys.filter(
    (key) =>
      key === StyleKeyType.isChanged || defaultStyle[key] === targetStyle[key]
  );
  return keys.length !== filteredKeys.length;
}

export function checkFeatureIsChanged(targetFeature: objType): boolean {
  if (!targetFeature) {
    return false;
  }
  const keys = Object.keys(targetFeature);
  for (let i = 0; i < keys.length; i += 1) {
    if (
      typeof targetFeature[keys[i]] === 'object' &&
      checkFeatureIsChanged(targetFeature[keys[i]]) === true
    ) {
      return true;
    }

    if (Object.values(targetFeature).includes(true)) return true;
  }
  return false;
}
