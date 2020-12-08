import { StyleType, StyleKeyType, objType } from '../common/type';

interface checkStyleIsChangedProps {
  defaultStyle: StyleType;
  style: StyleType;
}

export function checkStyleIsChanged({
  defaultStyle,
  style,
}: checkStyleIsChangedProps): boolean {
  const keys = Object.keys(defaultStyle) as StyleKeyType[];

  const filteredKeys = keys.filter(
    (key) => key === StyleKeyType.isChanged || defaultStyle[key] === style[key]
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
