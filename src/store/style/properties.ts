// import { StyleType, ElementType, FeatureType } from '../common/type';

// const style: StyleType = {
//   isChanged: false,
//   visibility: 'inherit',
//   color: '#55bf40',
//   weight: 0,
//   saturation: 0,
//   lightness: 0,
// };

// export const getDefaultStyle = (): StyleType => {
//   return JSON.parse(JSON.stringify(style));
// };

// const getDefaultElement = (): ElementType => {
//   return {
//     fill: getDefaultStyle(),
//     stroke: getDefaultStyle(),
//   };
// };

// export const getDefaultFeature = (): FeatureType => {
//   return {
//     isChanged: false,
//     section: getDefaultElement(),
//     labelText: getDefaultElement(),
//     labelIcon: getDefaultStyle(),
//   };
// };

import {
  StyleType,
  ElementNameType,
  FeatureType,
  FeatureNameType,
  HasPropertiesType,
  SubElementNameType,
  PropertyType,
  nice,
} from '../common/type';

import defaultStyle from '../../utils/rendering-data/layersColor2';

const style: StyleType = {
  isChanged: false,
  visibility: 'inherit',
  color: '#55bf40',
  weight: 0,
  saturation: 0,
  lightness: 0,
};

interface getDefaultStyleProps<T> {
  featureType: FeatureNameType;
  subFeatureType: T;
  elementType: ElementNameType;
  subElementType: SubElementNameType;
}

export const getDefaultStyle = ({
  featureType,
  subFeatureType,
  elementType,
  subElementType,
}: getDefaultStyleProps): StyleType => {
  return {
    ...JSON.parse(JSON.stringify(style)),
    color: defaultStyle[featureType][subFeatureType],
    // defaultStyle[featureType][subFeatureType][elementType][subElementType],
  };
};

export const getDefaultFeature = ({
  featureType,
  subFeatureType,
}: HasPropertiesType): FeatureType => {
  return {
    isChanged: false,
    section: defaultStyle[featureType][subFeatureType][ElementNameType.section]
      ? {
          [SubElementNameType.fill]: getDefaultStyle({
            featureType,
            subFeatureType,
            elementType: ElementNameType.section,
            subElementType: SubElementNameType.fill,
          }),
          [SubElementNameType.stroke]: getDefaultStyle({
            featureType,
            subFeatureType,
            elementType: ElementNameType.section,
            subElementType: SubElementNameType.stroke,
          }),
        }
      : null,
    labelText: defaultStyle[featureType][subFeatureType][
      ElementNameType.labelText
    ]
      ? {
          [SubElementNameType.fill]: getDefaultStyle({
            featureType,
            subFeatureType,
            elementType: ElementNameType.labelText,
            subElementType: SubElementNameType.fill,
          }),
          [SubElementNameType.stroke]: getDefaultStyle({
            featureType,
            subFeatureType,
            elementType: ElementNameType.labelText,
            subElementType: SubElementNameType.stroke,
          }),
        }
      : null,
    labelIcon: defaultStyle[featureType][subFeatureType][
      ElementNameType.labelIcon
    ]
      ? getDefaultStyle()
      : null,
  };
};
