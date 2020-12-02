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

export const arterialLayerNames = {
  all: [
    'road-arterial',
    'road-number-shield',
    'road-exit-shield',
    'road-arterial-label',
  ],
  polygon: [],
  line: ['road-arterial'],
  text: {
    all: ['road-number-shield', 'road-exit-shield', 'road-arterial-label'],
    hasStroke: ['road-arterial-label'],
    noStroke: ['road-number-shield', 'road-exit-shield'],
  },
  icon: [],
};

function arterialStyling({
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
          layerNames: arterialLayerNames.line,
          visibility,
        });
    } else if (detailName === ElementNameType.labelText) {
      if (subDetailName === SubElementNameType.fill)
        applyVisibility({
          map,
          layerNames: arterialLayerNames.text.noStroke,
          visibility,
        });
      else if (subDetailName === SubElementNameType.stroke)
        applyVisibility({
          map,
          layerNames: arterialLayerNames.text.hasStroke,
          visibility,
        });
    }
  } else if (key === 'color' || key === 'saturation' || key === 'lightness') {
    if (detailName === ElementNameType.section) {
      if (subDetailName === SubElementNameType.fill) {
        applyColor({
          map,
          layerNames: arterialLayerNames.line,
          color,
          type: ColorType.line,
          [key]: style[key as StyleKeyType],
        });
      }
    } else if (detailName === ElementNameType.labelText) {
      if (subDetailName === SubElementNameType.fill) {
        applyColor({
          map,
          layerNames: arterialLayerNames.text.all,
          color,
          type: ColorType.text,
          [key]: style[key as StyleKeyType],
        });
      } else if (subDetailName === SubElementNameType.stroke) {
        applyColor({
          map,
          layerNames: arterialLayerNames.text.hasStroke,
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
          layerNames: arterialLayerNames.line,
          type: WeightType.line,
          weight,
        });
      }
    }
    if (detailName === ElementNameType.labelText) {
      if (subDetailName === SubElementNameType.stroke)
        applyWeight({
          map,
          layerNames: arterialLayerNames.text.hasStroke,
          type: WeightType.textHalo,
          weight,
        });
    }
  }
}

export default arterialStyling;
