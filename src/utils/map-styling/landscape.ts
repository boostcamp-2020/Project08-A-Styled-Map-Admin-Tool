import { stylingProps } from './index';
import {
  applyColor,
  applyWeight,
  applyVisibility,
  WeightType,
  ColorType,
  StyleTypes,
} from '../applyStyle';
import { StyleKeyType, ElementNameType } from '../../store/common/type';

const SECTION = 'section';
const LABELTEXT = 'labelText';
const LABELICON = 'labelIcon';

type LandscapeSubFeature =
  | 'all'
  | 'human-made'
  | 'building'
  | 'natural'
  | 'landcover'
  | 'mountain';

interface SubElementsType {
  fill: string[];
  stroke: string[];
}

interface ElementsType {
  section: SubElementsType;
  labelText: SubElementsType;
  labelIcon: SubElementsType;
}

function makeSubElement(
  fillLayers: string[],
  strokeLayers: string[]
): SubElementsType {
  return { fill: fillLayers, stroke: strokeLayers };
}

const humanMadeSectionFill = ['landscape-human-made'];
const humanMadeSectionStroke = ['pitch-outline'];

const buildingSectionFill = ['landscape-building', 'building'];
const buildingSectionStroke = ['building-outline'];
const buildingLabel = ['building-number-label', 'poi-building-label'];

const naturalSectionFill = ['landscape-natural', 'national-park'];
const naturalLabel = ['natural-point-label'];

const landCoverSectionFill = [
  'land',
  'landscape-landcover',
  'landcover',
  'landuse',
  'land-structure-polygon',
];
const landCoverSectionStroke = ['land-structure-line'];

const mountainCoverSectionFill = ['hillshade'];

const layersByType: { [key in LandscapeSubFeature]: ElementsType } = {
  'human-made': {
    [SECTION]: makeSubElement(humanMadeSectionFill, humanMadeSectionStroke),
    [LABELTEXT]: makeSubElement([], []),
    [LABELICON]: makeSubElement([], []),
  },
  building: {
    [SECTION]: makeSubElement(buildingSectionFill, buildingSectionStroke),
    [LABELTEXT]: makeSubElement(buildingLabel, buildingLabel),
    [LABELICON]: makeSubElement([], []),
  },
  natural: {
    [SECTION]: makeSubElement(naturalSectionFill, []),
    [LABELTEXT]: makeSubElement(naturalLabel, naturalLabel),
    [LABELICON]: makeSubElement([], []),
  },
  landcover: {
    [SECTION]: makeSubElement(landCoverSectionFill, landCoverSectionStroke),
    [LABELTEXT]: makeSubElement([], []),
    [LABELICON]: makeSubElement([], []),
  },
  mountain: {
    [SECTION]: makeSubElement(mountainCoverSectionFill, []),
    [LABELTEXT]: makeSubElement([], []),
    [LABELICON]: makeSubElement([], []),
  },
  all: {
    [SECTION]: makeSubElement(
      [
        ...humanMadeSectionFill,
        ...buildingSectionFill,
        ...naturalSectionFill,
        ...landCoverSectionFill,
        ...mountainCoverSectionFill,
      ],
      [
        ...humanMadeSectionStroke,
        ...buildingSectionStroke,
        ...landCoverSectionStroke,
      ]
    ),
    [LABELTEXT]: makeSubElement([], [...buildingLabel, ...naturalLabel]),
    [LABELICON]: makeSubElement([], []),
  },
};

const VISIBLE = 1;
const INVISIBLE = 0;

const mappingDetailToFunc = {
  labelText: {
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
        funcName: () => null,
      },
      visibility: {
        typeName: 'what is my name?',
        funcName: applyVisibility,
      },
      isChanged: {
        typeName: null,
        funcName: () => null,
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
      isChanged: {
        typeName: null,
        funcName: () => null,
      },
    },
  },
  labelIcon: {
    color: {
      typeName: null,
      funcName: () => null,
    },
    saturation: {
      typeName: null,
      funcName: () => null,
    },
    lightness: {
      typeName: null,
      funcName: () => null,
    },
    weight: {
      typeName: null,
      funcName: () => null,
    },
    visibility: {
      typeName: ColorType.icon,
      funcName: applyWeight,
    },
    isChanged: {
      typeName: null,
      funcName: () => null,
    },
  },
  section: {
    fill: {
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
        funcName: () => null,
      },
      visibility: {
        typeName: ColorType.fill,
        funcName: applyVisibility,
      },
      isChanged: {
        typeName: null,
        funcName: () => null,
      },
    },
    stroke: {
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
        typeName: WeightType.line,
        funcName: applyVisibility,
      },
      isChanged: {
        typeName: null,
        funcName: () => null,
      },
    },
  },
};

function landscapeStyling({
  map,
  subFeature,
  element,
  subElement,
  key,
  style,
}: stylingProps): void {
  let type = null;
  let func = null;

  if (
    element === ElementNameType.section ||
    element === ElementNameType.labelText
  ) {
    const { typeName, funcName } = mappingDetailToFunc[element][subElement][
      key as StyleKeyType
    ];
    type = typeName;
    func = funcName;
  } else {
    const { typeName, funcName } = mappingDetailToFunc[element][
      key as StyleKeyType
    ];
    type = typeName;
    func = funcName;
  }

  if (!type) {
    return;
  }

  let layerNames =
    layersByType[subFeature as LandscapeSubFeature][element][subElement];
  if (
    key === 'visibility' &&
    (type === ColorType.icon || type === WeightType.textHalo)
  ) {
    func({
      map,
      layerNames,
      type,
      weight: style.visibility === 'none' ? INVISIBLE : VISIBLE,
    });
    return;
  }
  if (key === 'visibility') {
    func({
      map,
      layerNames,
      visibility: style.visibility,
    });
  }

  if (layerNames.includes('land')) {
    func({
      map,
      layerNames: ['land'],
      type: ColorType.background,
      color: style.color,
    });
    layerNames = layerNames.filter((item) => item !== 'land');
  }

  func({
    map,
    layerNames,
    type: type as StyleTypes,
    color: style.color,
    [key]: style[key as StyleKeyType],
  });
}

export default landscapeStyling;
