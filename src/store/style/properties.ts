import {
  StyleType,
  ElementNameType,
  FeatureType,
  SubElementNameType,
  FeaturePropsType,
  ElementPropsType,
  StylePropsType,
} from '../common/type';

import defaultStyle from '../../utils/rendering-data/layersColor';

const style: StyleType = {
  isChanged: false,
  visibility: 'inherit',
  color: '#55bf40',
  weight: 0,
  saturation: 0,
  lightness: 0,
};

export const getDefaultStyle = ({
  feature,
  subFeature,
  element,
  subElement,
}: ElementPropsType): StyleType => {
  const defaultColor = subElement
    ? (defaultStyle[feature][subFeature][element] as StylePropsType)[subElement]
    : defaultStyle[feature][subFeature][element];
  return {
    ...JSON.parse(JSON.stringify(style)),
    color: defaultColor,
  };
};

export const getDefaultFeature = ({
  feature,
  subFeature,
}: FeaturePropsType): FeatureType => {
  return {
    isChanged: false,
    section: defaultStyle[feature][subFeature][ElementNameType.section]
      ? {
          [SubElementNameType.fill]: getDefaultStyle({
            feature,
            subFeature,
            element: ElementNameType.section,
            subElement: SubElementNameType.fill,
          }),
          [SubElementNameType.stroke]: getDefaultStyle({
            feature,
            subFeature,
            element: ElementNameType.section,
            subElement: SubElementNameType.stroke,
          }),
        }
      : null,
    labelText: defaultStyle[feature][subFeature][ElementNameType.labelText]
      ? {
          [SubElementNameType.fill]: getDefaultStyle({
            feature,
            subFeature,
            element: ElementNameType.labelText,
            subElement: SubElementNameType.fill,
          }),
          [SubElementNameType.stroke]: getDefaultStyle({
            feature,
            subFeature,
            element: ElementNameType.labelText,
            subElement: SubElementNameType.stroke,
          }),
        }
      : null,
    labelIcon: defaultStyle[feature][subFeature][ElementNameType.labelIcon]
      ? getDefaultStyle({
          feature,
          subFeature,
          element: ElementNameType.labelIcon,
        })
      : null,
  };
};
