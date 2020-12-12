/* eslint-disable consistent-return */
import { stylingProps } from './index';
import {
  applyColor,
  applyWeight,
  applyVisibility,
  WeightType,
  ColorType,
  StyleTypes,
  VisibilityType,
} from '../applyStyle';
import {
  StyleKeyType,
  ElementNameType,
  PoiNameType,
} from '../../store/common/type';
import seperatedLayers from './macgyver/seperatedLayers';
import { getIdsFromLayersArr, INVISIBLE, VISIBLE } from './macgyver/utils';

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

  /** get LayerNames */
  if (!type || !func) return;
  const layerNames = getIdsFromLayersArr(
    seperatedLayers.poi[subFeature as PoiNameType].labelText
  );

  /** styling */
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

  func({
    map,
    layerNames,
    type: type as StyleTypes,
    color: style.color,
    [key]: style[key as StyleKeyType],
  });
}

export default poiStyling;
