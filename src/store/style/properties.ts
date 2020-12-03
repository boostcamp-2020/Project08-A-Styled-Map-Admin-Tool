import {
  StyleType,
  ElementNameType,
  FeatureType,
  FeatureNameType,
  HasPropertiesType,
  SubElementNameType,
} from '../common/type';
import { hslToHEX } from '../../utils/colorFormat';

import defaultStyle from '../../utils/rendering-data/layersColor4';

const style: StyleType = {
  isChanged: false,
  visibility: 'inherit',
  color: '#55bf40',
  weight: 0,
  saturation: 0,
  lightness: 0,
};

interface getDefaultStyleProps {
  featureName: FeatureNameType;
  subFeatureName: string;
  elementName: ElementNameType;
  subElementName?: SubElementNameType;
}

const featuresDetailOption = {
  poi: {
    hasSection: false,
    hasLabelText: true,
    hasLabelIcon: true,
  },
  road: {
    hasSection: true,
    hasLabelText: true,
    hasLabelIcon: true,
  },
  administrative: {
    hasSection: true,
    hasLabelText: true,
    hasLabelIcon: false,
  },
  landscape: {
    hasSection: true,
    hasLabelText: true,
    hasLabelIcon: false,
  },
  transit: {
    hasSection: true,
    hasLabelText: true,
    hasLabelIcon: false,
  },
  water: {
    hasSection: true,
    hasLabelText: true,
    hasLabelIcon: false,
  },
  marker: {
    hasSection: false,
    hasLabelText: true,
    hasLabelIcon: true,
  },
};

export const getDefaultStyle = ({
  featureName,
  subFeatureName,
  elementName,
  subElementName,
}: getDefaultStyleProps): StyleType => {
  const color =
    defaultStyle[
      `${featureName}-${subFeatureName}-${elementName}-${subElementName || ''}`
    ];
  return {
    ...JSON.parse(JSON.stringify(style)),
    color: color ? hslToHEX(color) : '#000000',
  };
};

export const getDefaultFeature = ({
  featureName,
  subFeatureName,
}: HasPropertiesType): FeatureType => {
  return {
    isChanged: false,
    section: featuresDetailOption[featureName].hasSection
      ? {
          [SubElementNameType.fill]: getDefaultStyle({
            featureName,
            subFeatureName,
            elementName: ElementNameType.section,
            subElementName: SubElementNameType.fill,
          }),
          [SubElementNameType.stroke]: getDefaultStyle({
            featureName,
            subFeatureName,
            elementName: ElementNameType.section,
            subElementName: SubElementNameType.stroke,
          }),
        }
      : null,
    labelText: featuresDetailOption[featureName].hasLabelText
      ? {
          [SubElementNameType.fill]: getDefaultStyle({
            featureName,
            subFeatureName,
            elementName: ElementNameType.labelText,
            subElementName: SubElementNameType.fill,
          }),
          [SubElementNameType.stroke]: getDefaultStyle({
            featureName,
            subFeatureName,
            elementName: ElementNameType.labelText,
            subElementName: SubElementNameType.stroke,
          }),
        }
      : null,
    labelIcon: featuresDetailOption[featureName].hasLabelIcon
      ? getDefaultStyle({
          featureName,
          subFeatureName,
          elementName: ElementNameType.labelIcon,
        })
      : null,
  };
};
