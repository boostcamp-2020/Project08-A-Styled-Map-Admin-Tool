/* eslint-disable no-nested-ternary */
/* eslint-disable no-case-declarations */
import { stylingProps } from '.';
import { StyleKeyType, ElementNameType } from '../../store/common/type';
import {
  applyVisibility,
  applyColor,
  applyWeight,
  ColorType,
  WeightType,
  VisibilityType,
} from '../../utils/applyStyle';
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

function transitStyling({
  map,
  subFeature,
  key,
  element,
  subElement,
  style,
}: stylingProps): void {
  if (key === 'isChanged' || element === ElementNameType.labelIcon) return;

  const { typeName: type, funcName: func } = mappingDetailToFunc[element][
    subElement
  ][key];
  if (!type || !func) return;

  /** get LayerNames */
  let layerNames: string[] = [];
  if (element === ElementNameType.labelText) {
    layerNames = getIdsFromLayersArr(
      seperatedLayers.transit[subFeature].labelText
    );
  } else {
    if (!seperatedLayers.transit[subFeature][element]) return;
    layerNames = getIdsFromLayersArr(
      seperatedLayers.transit[subFeature][element][subElement]
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

export default transitStyling;
