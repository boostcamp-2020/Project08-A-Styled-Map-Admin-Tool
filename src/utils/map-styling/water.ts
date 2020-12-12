import { stylingProps } from '.';
import { ElementNameType, StyleKeyType } from '../../store/common/type';
import {
  ColorType,
  WeightType,
  VisibilityType,
  applyVisibility,
  applyColor,
  applyWeight,
} from '../applyStyle';
import seperatedLayers from './macgyver/seperatedLayers';
import { getIdsFromLayersArr, INVISIBLE, VISIBLE } from './macgyver/utils';

const mappingDetailToFunc = {
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
        funcName: null,
      },
      visibility: {
        typeName: VisibilityType.visible,
        funcName: applyVisibility,
      },
    },
    stroke: {
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
    },
  },
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
};

function waterStyling({
  map,
  element,
  subElement,
  key,
  style,
}: stylingProps): void {
  if (key === 'isChanged' || element === ElementNameType.labelIcon) return;

  const { typeName: type, funcName: func } = mappingDetailToFunc[element][
    subElement
  ][key];
  if (!type || !func) return;

  /** get LayerNames */
  let layerNames = null;
  if (element === ElementNameType.labelText) {
    layerNames = getIdsFromLayersArr(seperatedLayers.water.all.labelText);
  } else {
    layerNames = getIdsFromLayersArr(
      seperatedLayers.water.all[element][subElement]
    );
  }

  /** styling */
  if (key === 'visibility' && type === WeightType.textHalo) {
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
    type,
    color: style.color,
    [key]: style[key as StyleKeyType],
  });
}

export default waterStyling;
