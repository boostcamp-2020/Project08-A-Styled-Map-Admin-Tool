import { getDefaultStyle } from './properties';
import { StyleType, StyleKeyType, objType } from '../common/type';

export function checkStyleIsChanged(targetStyle: StyleType): boolean {
  const defaultStyle: StyleType = getDefaultStyle();
  const keys = Object.keys(defaultStyle) as StyleKeyType[];

  const filteredKeys = keys.filter(
    (key) => key === 'isChanged' || defaultStyle[key] === targetStyle[key]
  );
  return keys.length !== filteredKeys.length;
}

export function checkFeatureIsChanged(targetFeature: objType): boolean {
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
