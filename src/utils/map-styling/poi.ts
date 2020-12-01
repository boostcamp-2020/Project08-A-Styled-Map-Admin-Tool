/* eslint-disable consistent-return */
import { stylingProps } from './index';
import {
  applyColor,
  applyWeight,
  applyVisibility,
  colorType,
  weightType,
  WeightTypeName,
  ColorTypeName,
} from '../applyStyle';
import { StyleKeyType, ElementName } from '../../store/common/type';

type PoiSubFeature =
  | 'all'
  | 'landmark'
  | 'business'
  | 'government'
  | 'medical'
  | 'park'
  | 'worship'
  | 'school'
  | 'sports'
  | 'etc';

type POI_LAYERS_TYPE = {
  [name in PoiSubFeature]: string[];
};

const VISIBLE = '1';
const INVISIBLE = '0';
const POI_LAYERS: POI_LAYERS_TYPE = {
  all: [
    'poi-attraction',
    'poi-arts-label',
    'poi-landmark-label',
    'poi-business',
    'poi-food-label',
    'poi-store-label',
    'poi-government',
    'poi-public-label',
    'poi-general-label',
    'poi-medical',
    'poi-medical-label',
    'poi-park',
    'poi-park-label',
    'poi-worship',
    'poi-religion-label',
    'poi-school',
    'poi-education-label',
    'poi-sport-label',
    'poi-etc',
    'poi-industrial-label',
    'poi-historic-label',
    'poi-building-label',
  ],
  landmark: ['poi-attraction', 'poi-arts-label', 'poi-landmark-label'],
  business: ['poi-business', 'poi-food-label', 'poi-store-label'],
  government: ['poi-government', 'poi-public-label', 'poi-general-label'],
  medical: ['poi-medical', 'poi-medical-label'],
  park: ['poi-park', 'poi-park-label'],
  worship: ['poi-worship', 'poi-religion-label'],
  school: ['poi-school', 'poi-education-label'],
  sports: ['poi-sport-label'],
  etc: [
    'poi-etc',
    'poi-industrial-label',
    'poi-historic-label',
    'poi-building-label',
  ],
};

const mappingDetailToFunc = {
  labelText: {
    fill: {
      color: {
        typeName: ColorTypeName['text-color'],
        funcName: applyColor,
      },
      saturation: {
        typeName: ColorTypeName['text-color'],
        funcName: applyColor,
      },
      lightness: {
        typeName: ColorTypeName['text-color'],
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
        typeName: ColorTypeName['text-halo-color'],
        funcName: applyColor,
      },
      saturation: {
        typeName: ColorTypeName['text-halo-color'],
        funcName: applyColor,
      },
      lightness: {
        typeName: ColorTypeName['text-halo-color'],
        funcName: applyColor,
      },
      weight: {
        typeName: WeightTypeName['text-halo-width'],
        funcName: applyWeight,
      },
      visibility: {
        typeName: WeightTypeName['text-halo-width'],
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
      typeName: WeightTypeName['icon-opacity'],
      funcName: applyWeight,
    },
    isChanged: {
      typeName: null,
      funcName: () => null,
    },
  },
};

function poiStyling({
  map,
  subFeatureName,
  detailName,
  subDetailName,
  style,
  key,
}: stylingProps): void {
  let type = null;
  let func = null;

  if (detailName === ElementName.section) return;
  if (detailName === ElementName.labelText) {
    const { typeName, funcName } = mappingDetailToFunc[detailName][
      subDetailName
    ][key as StyleKeyType];
    type = typeName;
    func = funcName;
  } else {
    const { typeName, funcName } = mappingDetailToFunc[detailName][
      key as StyleKeyType
    ];
    type = typeName;
    func = funcName;
  }

  if (!type) return;
  if (
    key === 'visibility' &&
    (type === WeightTypeName['icon-opacity'] ||
      type === WeightTypeName['text-halo-width'])
  ) {
    func({
      map,
      layerNames: POI_LAYERS[subFeatureName as PoiSubFeature],
      type,
      weight: style.visibility === 'none' ? INVISIBLE : VISIBLE,
    });
    return;
  }

  func({
    map,
    layerNames: POI_LAYERS[subFeatureName as PoiSubFeature],
    type: type as weightType | colorType,
    color: style.color,
    [key]: style[key as StyleKeyType],
  });
}

export default poiStyling;
