import {
  SubElementActionPayload,
  ElementActionPayload,
  FeatureType,
  SubElementType,
} from '../common/type';

interface combineElementProps {
  elementStyle: ElementActionPayload;
  initialElementStyle: FeatureType;
}

export const combineElement = ({
  elementStyle,
  initialElementStyle,
}: combineElementProps): FeatureType => {
  const update = initialElementStyle;
  if (elementStyle.labelIcon && update.labelIcon) {
    update.labelIcon = {
      ...update.labelIcon,
      ...elementStyle.labelIcon,
    };
  }

  if (elementStyle.labelText && update.labelText) {
    update.labelText = combineSubElement({
      subElementStyle: elementStyle.labelText,
      initialSubElementStyle: update.labelText,
    });
  }

  if (elementStyle.section && update.section) {
    update.section = combineSubElement({
      subElementStyle: elementStyle.section,
      initialSubElementStyle: update.section,
    });
  }

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
  if (subElementStyle.fill) {
    update.fill = { ...update.fill, ...subElementStyle.fill };
  }
  if (subElementStyle.stroke) {
    update.stroke = { ...update.stroke, ...subElementStyle.stroke };
  }
  return update as SubElementType;
};
