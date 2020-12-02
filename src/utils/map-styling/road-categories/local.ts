import { stylingProps } from '../index';
import {
  StyleKeyType,
  ElementNameType,
  SubElementNameType,
} from '../../../store/common/type';
import {
  applyVisibility,
  applyColor,
  applyWeight,
  ColorType,
  WeightType,
} from '../../applyStyle';

const localLayerNames = {
  all: ['ferry', 'ferry-auto', 'road-local', 'road-local-label'],
  polygon: [],
  line: ['ferry', 'ferry-auto', 'road-local'],
  text: {
    all: ['road-local-label'],
    hasStroke: ['road-local-label'],
    noStroke: [],
  },
  icon: [],
};

function localStyling({
  map,
  subFeatureName,
  detailName,
  subDetailName,
  key,
  style,
}: stylingProps): void {
  const { visibility, color, weight } = style;

  if (key === 'visibility') {
    if (detailName === ElementNameType.section) {
      if (subDetailName === SubElementNameType.fill)
        applyVisibility({
          map,
          layerNames: localLayerNames.line,
          visibility,
        });
    } else if (detailName === ElementNameType.labelText) {
      if (subDetailName === SubElementNameType.fill)
        applyVisibility({
          map,
          layerNames: localLayerNames.text.noStroke,
          visibility,
        });
      else if (subDetailName === SubElementNameType.stroke)
        applyVisibility({
          map,
          layerNames: localLayerNames.text.hasStroke,
          visibility,
        });
    }
  } else if (key === 'color' || key === 'saturation' || key === 'lightness') {
    if (detailName === 'section') {
      if (subDetailName === 'fill') {
        applyColor({
          map,
          layerNames: localLayerNames.line,
          color,
          type: ColorType.line,
          [key]: style[key as StyleKeyType],
        });
      }
    } else if (detailName === 'labelText') {
      if (subDetailName === SubElementNameType.fill) {
        applyColor({
          map,
          layerNames: localLayerNames.text.all,
          color,
          type: ColorType.text,
          [key]: style[key as StyleKeyType],
        });
      } else if (subDetailName === SubElementNameType.stroke) {
        applyColor({
          map,
          layerNames: localLayerNames.text.hasStroke,
          color,
          type: ColorType.textHalo,
          [key]: style[key as StyleKeyType],
        });
      }
    }
  } else if (key === 'weight') {
    if (detailName === ElementNameType.section) {
      if (subDetailName === SubElementNameType.fill) {
        applyWeight({
          map,
          layerNames: localLayerNames.line,
          type: WeightType.line,
          weight,
        });
      }
    }
    if (detailName === ElementNameType.labelText) {
      if (subDetailName === SubElementNameType.stroke)
        applyWeight({
          map,
          layerNames: localLayerNames.text.hasStroke,
          type: WeightType.textHalo,
          weight,
        });
    }
  }
}

export default localStyling;
