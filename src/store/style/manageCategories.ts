import {
  SubElementActionPayload,
  ElementActionPayload,
  StyleActionPayload,
  FeatureType,
  SubElementType,
  StyleType,
  SubElementNameType,
  ElementNameType,
} from '../common/type';
import { checkStyleIsChanged } from './compareStyle';

interface combineElementProps {
  elementStyle: ElementActionPayload;
  initialElementStyle: FeatureType;
}

export const combineElement = ({
  elementStyle,
  initialElementStyle,
}: combineElementProps): FeatureType => {
  const update = initialElementStyle;
  const elements = Object.keys(elementStyle) as ElementNameType[];
  elements.forEach((element) => {
    if (update[element]) {
      switch (element) {
        case ElementNameType.labelIcon: {
          update[element] = combineStyle({
            style: elementStyle[element] as StyleActionPayload,
            defaultStyle: update[element] as StyleType,
          });
          break;
        }
        case ElementNameType.section:
        case ElementNameType.labelText:
          update[element] = combineSubElement({
            subElementStyle: elementStyle[element] as SubElementActionPayload,
            initialSubElementStyle: update[element] as SubElementType,
          });
          break;
        default:
          break;
      }
    }
  });
  return update;
};

interface combineSubElementProps {
  subElementStyle: SubElementActionPayload;
  initialSubElementStyle: SubElementType;
}

const combineSubElement = ({
  subElementStyle,
  initialSubElementStyle,
}: combineSubElementProps): SubElementType => {
  const update = initialSubElementStyle;
  const subElements = Object.keys(subElementStyle) as SubElementNameType[];
  subElements.forEach((subElement) => {
    update[subElement] = combineStyle({
      style: subElementStyle[subElement] as StyleActionPayload,
      defaultStyle: update[subElement],
    });
  });
  return update as SubElementType;
};

interface combineStyleProps {
  style: StyleActionPayload;
  defaultStyle: StyleType;
}

const combineStyle = ({
  style,
  defaultStyle,
}: combineStyleProps): StyleType => {
  const update: StyleType = {
    ...defaultStyle,
    ...style,
  };
  return {
    ...update,
    isChanged: checkStyleIsChanged({ defaultStyle, style: update }),
  };
};
