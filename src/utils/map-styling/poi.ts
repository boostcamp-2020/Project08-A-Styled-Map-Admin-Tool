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
    'poi-landmark-labelText-1',
    'poi-landmark-labelText-2',
    'poi-landmark-labelText-3',
    'poi-business-labelText-1',
    'poi-business-labelText-2',
    'poi-business-labelText-3',
    'poi-government-labelText-1',
    'poi-government-labelText-2',
    'poi-government-labelText-3',
    'poi-medical-labelText-1',
    'poi-medical-labelText-2',
    'poi-park-labelText-1',
    'poi-park-labelText-2',
    'poi-worship-labelText-1',
    'poi-worship-labelText-2',
    'poi-school-labelText-1',
    'poi-school-labelText-2',
    'poi-sport-labelText',
    'poi-etc-labelText-1',
    'poi-etc-labelText-2',
    'poi-etc-labelText-3',
  ],
  landmark: [
    'poi-landmark-labelText-1',
    'poi-landmark-labelText-2',
    'poi-landmark-labelText-3',
  ],
  business: [
    'poi-business-labelText-1',
    'poi-business-labelText-2',
    'poi-business-labelText-3',
  ],
  government: [
    'poi-government-labelText-1',
    'poi-government-labelText-2',
    'poi-government-labelText-3',
  ],
  medical: ['poi-medical-labelText-1', 'poi-medical-labelText-2'],
  park: ['poi-park-labelText-1', 'poi-park-labelText-2'],
  worship: ['poi-worship-labelText-1', 'poi-worship-labelText-2'],
  school: ['poi-school-labelText-1', 'poi-school-labelText-2'],
  sports: ['poi-sport-labelText'],
  etc: ['poi-etc-labelText-1', 'poi-etc-labelText-2', 'poi-etc-labelText-3'],
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
