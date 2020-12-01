import { StyleType, ElementType, FeatureType } from '../common/type';

const style: StyleType = {
  isChanged: false,
  visibility: 'inherit',
  color: '#55bf40',
  weight: '0',
  saturation: '0',
  lightness: '0',
};

export const getDefaultStyle = (): StyleType => {
  return JSON.parse(JSON.stringify(style));
};

const getDefaultElement = (): ElementType => {
  return {
    fill: getDefaultStyle(),
    stroke: getDefaultStyle(),
  };
};

export const getDefaultFeature = (): FeatureType => {
  return {
    isChanged: false,
    section: getDefaultElement(),
    labelText: getDefaultElement(),
    labelIcon: getDefaultStyle(),
  };
};
