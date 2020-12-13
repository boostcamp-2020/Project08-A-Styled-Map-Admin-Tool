import {
  applyColor,
  applyWeight,
  applyVisibility,
  WeightType,
  ColorType,
  VisibilityType,
} from '../../applyStyle';

const labelTextTemplate = {
  fill: {
    color: {
      typeName: ColorType.text,
      funcName: applyColor,
    },
    saturation: {
      typeName: ColorType.text,
      funcName: applyColor,
    },
    lightness: {
      typeName: ColorType.text,
      funcName: applyColor,
    },
    weight: {
      typeName: null,
      funcName: null,
    },
    visibility: {
      typeName: VisibilityType.visible,
      funcName: applyVisibility,
    },
  },
  stroke: {
    color: {
      typeName: ColorType.textHalo,
      funcName: applyColor,
    },
    saturation: {
      typeName: ColorType.textHalo,
      funcName: applyColor,
    },
    lightness: {
      typeName: ColorType.textHalo,
      funcName: applyColor,
    },
    weight: {
      typeName: WeightType.textHalo,
      funcName: applyWeight,
    },
    visibility: {
      typeName: WeightType.textHalo,
      funcName: applyWeight,
    },
  },
};

export const poiMappingToFunc = {
  labelText: labelTextTemplate,
  labelIcon: {
    visibility: {
      typeName: ColorType.icon,
      funcName: applyWeight,
    },
  },
};
