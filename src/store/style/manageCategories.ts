import {
  ElementNameType,
  SubElementActionPayload,
  StyleActionPayload,
  ElementActionPayload,
} from '../common/type';

interface combineCatecoryProps {
  element: ElementNameType;
  elementStyle: ElementActionPayload;
  initialElementStyle: ElementActionPayload;
}

export function combineCategory({
  element,
  elementStyle,
  initialElementStyle,
}: combineCatecoryProps): ElementActionPayload {
  const update = initialElementStyle;
  if (element === 'labelIcon' && elementStyle[element]) {
    (update[element] as StyleActionPayload) = {
      ...update[element],
      ...elementStyle[element],
    };
    return update;
  }

  const verifiedCategory = elementStyle[element] as SubElementActionPayload;
  const verifiedUpdate = update[element] as SubElementActionPayload;

  if (verifiedCategory.fill) {
    verifiedUpdate.fill = { ...verifiedUpdate.fill, ...verifiedCategory.fill };
  }
  if (verifiedCategory.stroke) {
    verifiedUpdate.stroke = {
      ...verifiedUpdate.stroke,
      ...verifiedCategory.stroke,
    };
  }
  return update;
}
