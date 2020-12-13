import {
  applyColor,
  applyWeight,
  applyVisibility,
  WeightType,
  ColorType,
  VisibilityType,
} from '../../applyStyle';

/** template */
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

const sectionFillTemplate = {
  color: {
    typeName: ColorType.fill,
    funcName: applyColor,
  },
  saturation: {
    typeName: ColorType.fill,
    funcName: applyColor,
  },
  lightness: {
    typeName: ColorType.fill,
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
};

const sectionStrokeTemplate = {
  color: {
    typeName: ColorType.line,
    funcName: applyColor,
  },
  saturation: {
    typeName: ColorType.line,
    funcName: applyColor,
  },
  lightness: {
    typeName: ColorType.line,
    funcName: applyColor,
  },
  weight: {
    typeName: WeightType.line,
    funcName: applyWeight,
  },
  visibility: {
    typeName: VisibilityType.visible,
    funcName: applyVisibility,
  },
};

const nullTemplate = {
  color: {
    typeName: null,
    funcName: null,
  },
  saturation: {
    typeName: null,
    funcName: null,
  },
  lightness: {
    typeName: null,
    funcName: null,
  },
  weight: {
    typeName: null,
    funcName: null,
  },
  visibility: {
    typeName: null,
    funcName: null,
  },
};

/**
 * mapping variable
 */
export const poiMappingToFunc = {
  labelText: labelTextTemplate,
  labelIcon: {
    visibility: {
      typeName: ColorType.icon,
      funcName: applyWeight,
    },
  },
};

export const administrativeMappingToFunc = {
  section: {
    fill: nullTemplate,
    stroke: sectionStrokeTemplate,
  },
  labelText: labelTextTemplate,
};

export const landscapeMappingToFunc = {
  section: {
    fill: sectionFillTemplate,
    stroke: sectionStrokeTemplate,
  },
  labelText: labelTextTemplate,
};

export const roadMappingToFunc = {
  section: {
    fill: {
      color: {
        typeName: ColorType.line,
        funcName: applyColor,
      },
      saturation: {
        typeName: ColorType.line,
        funcName: applyColor,
      },
      lightness: {
        typeName: ColorType.line,
        funcName: applyColor,
      },
      weight: {
        typeName: WeightType.line,
        funcName: applyWeight,
      },
      visibility: {
        typeName: VisibilityType.visible,
        funcName: applyVisibility,
      },
    },
    stroke: sectionStrokeTemplate,
  },
  labelText: labelTextTemplate,
  labelIcon: {
    visibility: {
      typeName: ColorType.icon,
      funcName: applyVisibility,
    },
  },
};

export const transitMappingToFunc = {
  section: {
    fill: sectionFillTemplate,
    stroke: sectionStrokeTemplate,
  },
  labelText: labelTextTemplate,
};

export const waterMappingToFunc = {
  section: {
    fill: sectionFillTemplate,
    stroke: nullTemplate,
  },
  labelText: labelTextTemplate,
};
