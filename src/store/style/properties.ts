import {
  StyleType,
  ElementNameType,
  FeatureType,
  SubElementNameType,
  FeaturePropsType,
  ElementPropsType,
  DefaultElementType,
  DefaultStyleType,
} from '../common/type';
import { hslToHEX } from '../../utils/colorFormat';

import defaultStyle from '../../utils/rendering-data/defaultStyle';

const style: StyleType = {
  isChanged: false,
  visibility: 'inherit',
  color: '#000000',
  weight: 0,
};

export const getDefaultStyle = ({
  feature,
  subFeature,
  element,
  subElement,
}: ElementPropsType): StyleType => {
  const defaultState = subElement
    ? ((defaultStyle[feature][subFeature][element] as DefaultElementType)[
        subElement
      ] as DefaultStyleType)
    : (defaultStyle[feature][subFeature][element] as DefaultStyleType);

  return {
    ...JSON.parse(JSON.stringify(style)),
    visibility: subFeature === 'all' ? 'visible' : 'inherit',
    color: hslToHEX(defaultState?.color as string),
    weight: defaultState?.weight || 0,
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
