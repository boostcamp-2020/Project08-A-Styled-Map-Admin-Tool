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
  const defaultState = subElement
    ? ((defaultStyle[feature][subFeature][element] as DefaultElementType)[
        subElement
      ] as DefaultStyleType)
    : (defaultStyle[feature][subFeature][element] as DefaultStyleType);

  const hslArr = defaultState.color.match(
    /hsl\((\d+), (\d+)%, (\d+)%\)/
  ) as string[];

  const s = hslArr ? hslArr[2] : 0;
  const l = hslArr ? hslArr[3] : 0;

  return {
    ...JSON.parse(JSON.stringify(style)),
    color: hslToHEX(defaultState.color as string),
    weight: defaultState.weight,
    saturation: Number(s),
    lightness: Number(l),
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
