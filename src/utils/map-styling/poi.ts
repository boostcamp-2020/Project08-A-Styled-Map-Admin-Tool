/* eslint-disable consistent-return */
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

const VISIBLE = 1;
const INVISIBLE = 0;
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
        typeName: 'what is my name?',
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
  },
  labelIcon: {
    visibility: {
      typeName: ColorType.icon,
      funcName: applyWeight,
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

  if (detailName === ElementNameType.section) return;
  if (detailName === ElementNameType.labelText && key !== 'isChanged') {
    const { typeName, funcName } = mappingDetailToFunc[detailName][
      subDetailName
    ][key];
    type = typeName;
    func = funcName;
  } else if (detailName === ElementNameType.labelIcon && key === 'visibility') {
    const { typeName, funcName } = mappingDetailToFunc[detailName][key];
    type = typeName;
    func = funcName;
  }

  if (!type || !func) return;
  if (
    key === 'visibility' &&
    (type === ColorType.icon || type === WeightType.textHalo)
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
    type: type as StyleTypes,
    color: style.color,
    [key]: style[key as StyleKeyType],
  });
}

export default poiStyling;
