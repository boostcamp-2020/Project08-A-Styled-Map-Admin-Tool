import { stylingProps } from './index';
import {
  applyColor,
  applyWeight,
  applyVisibility,
  WeightType,
  ColorType,
  VisibilityType,
} from '../applyStyle';
import { StyleKeyType, ElementNameType } from '../../store/common/type';
import seperatedLayers from './macgyver/seperatedLayers';
import {
  getIdsFromLayersArr,
  getIdsFromLayersArrWithType,
  getIdsFromLayersArrWithoutType,
  INVISIBLE,
  VISIBLE,
} from './macgyver/utils';

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

function landscapeStyling({
  map,
  subFeature,
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
  let layerNames: string[] = [];
  let outsideLayerNames: string[] = [];
  if (element === ElementNameType.labelText) {
    layerNames = getIdsFromLayersArr(
      seperatedLayers.landscape[subFeature].labelText
    );
  } else {
    layerNames = getIdsFromLayersArrWithoutType(
      seperatedLayers.landscape[subFeature][element][subElement],
      'background'
    );
    outsideLayerNames = getIdsFromLayersArrWithType(
      seperatedLayers.landscape[subFeature][element][subElement],
      'background'
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

  if (outsideLayerNames.length) {
    func({
      map,
      layerNames: outsideLayerNames,
      type: ColorType.background,
      color: style.color,
      [key]: style[key as StyleKeyType],
    });
  }

  func({
    map,
    layerNames,
    type,
    color: style.color,
    [key]: style[key as StyleKeyType],
  });
}

export default landscapeStyling;
