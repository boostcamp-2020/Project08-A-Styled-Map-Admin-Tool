import { stylingProps } from '.';
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
} from './macgyver/utils';
import weightTemplate from './macgyver/weightTemplate';

const mappingDetailToFunc = {
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
  labelIcon: {
    visibility: {
      typeName: ColorType.icon,
      funcName: applyVisibility,
    },
  },
};

function roadStyling({
  map,
  subFeature,
  element,
  subElement,
  key,
  style,
}: stylingProps): void {
  if (key === 'isChanged') return;
  let type = null;
  let func = null;

  if (element === ElementNameType.labelIcon) {
    if (key !== 'visibility') return;
    const { typeName, funcName } = mappingDetailToFunc[element][key];
    type = typeName;
    func = funcName;
  } else {
    const { typeName, funcName } = mappingDetailToFunc[element][subElement][
      key
    ];
    type = typeName;
    func = funcName;
  }

  /** get LayerNames */
  if (!type || !func) return;
  let layerNames: string[] = [];
  let outsideLayerNames: string[] = [];
  if (
    element === ElementNameType.labelText ||
    element === ElementNameType.labelIcon
  ) {
    layerNames = getIdsFromLayersArr(seperatedLayers.road[subFeature][element]);
  } else {
    layerNames = getIdsFromLayersArrWithoutType(
      seperatedLayers.road[subFeature][element][subElement],
      'fill'
    );
    outsideLayerNames = getIdsFromLayersArrWithType(
      seperatedLayers.road[subFeature][element][subElement],
      'fill'
    );
  }

  /** set weight with weightTemplate */
  let zoomWeight = null;
  if (key === 'weight') {
    zoomWeight = weightTemplate[subFeature][subElement](style.weight);
  }

  /** styling */
  // fill일 때만 조건문 추가
  if (outsideLayerNames.length && key !== 'weight') {
    func({
      map,
      layerNames: outsideLayerNames,
      type: ColorType.fill,
      color: '#ffffff',
      [key]: style[key as StyleKeyType],
    });
  }

  func({
    map,
    layerNames,
    type,
    color: style.color,
    [key]: zoomWeight || style[key as StyleKeyType],
  });
}

export default roadStyling;
