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
    'poi-arts-label',
    'poi-landmark-label',
    'poi-food-label',
    'poi-store-label',
    'poi-public-label',
    'poi-general-label',
    'poi-medical-label',
    'poi-park-label',
    'poi-religion-label',
    'poi-education-label',
    'poi-sport-label',
    'poi-industrial-label',
    'poi-historic-label',
  ],
  landmark: ['poi-arts-label', 'poi-landmark-label'],
  business: ['poi-food-label', 'poi-store-label'],
  government: ['poi-public-label', 'poi-general-label'],
  medical: ['poi-medical-label'],
  park: ['poi-park-label'],
  worship: ['poi-religion-label'],
  school: ['poi-education-label'],
  sports: ['poi-sport-label'],
  etc: ['poi-industrial-label', 'poi-historic-label'],
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
  subFeature,
  element,
  subElement,
  style,
  key,
}: stylingProps): void {
  let type = null;
  let func = null;

  if (element === ElementNameType.section) return;
  if (element === ElementNameType.labelText && key !== 'isChanged') {
    const { typeName, funcName } = mappingDetailToFunc[element][subElement][
      key
    ];
    type = typeName;
    func = funcName;
  } else if (element === ElementNameType.labelIcon && key === 'visibility') {
    const { typeName, funcName } = mappingDetailToFunc[element][key];
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
      layerNames: POI_LAYERS[subFeature as PoiSubFeature],
      type,
      weight: style.visibility === 'none' ? INVISIBLE : VISIBLE,
    });
    return;
  }

  func({
    map,
    layerNames: POI_LAYERS[subFeature as PoiSubFeature],
    type: type as StyleTypes,
    color: style.color,
    [key]: style[key as StyleKeyType],
  });
}

export default poiStyling;
