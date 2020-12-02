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

const sidewalkLayerNames = {
  all: ['road-footway', 'road-sidewalk-label'],
  polygon: [],
  line: ['road-footway'],
  text: {
    all: ['road-sidewalk-label'],
    hasStroke: ['road-sidewalk-label'],
    noStroke: [],
  },
  icon: [],
};

function sidewalkStyling({
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
          layerNames: sidewalkLayerNames.line,
          visibility,
        });
    } else if (detailName === ElementNameType.labelText) {
      if (subDetailName === SubElementNameType.fill)
        applyVisibility({
          map,
          layerNames: sidewalkLayerNames.text.noStroke,
          visibility,
        });
      else if (subDetailName === SubElementNameType.stroke)
        applyVisibility({
          map,
          layerNames: sidewalkLayerNames.text.hasStroke,
          visibility,
        });
    }
  } else if (key === 'color' || key === 'saturation' || key === 'lightness') {
    if (detailName === 'section') {
      if (subDetailName === 'fill') {
        applyColor({
          map,
          layerNames: sidewalkLayerNames.line,
          color,
          type: ColorType.line,
          [key]: style[key as StyleKeyType],
        });
      }
    } else if (detailName === 'labelText') {
      if (subDetailName === SubElementNameType.fill) {
        applyColor({
          map,
          layerNames: sidewalkLayerNames.text.all,
          color,
          type: ColorType.text,
          [key]: style[key as StyleKeyType],
        });
      } else if (subDetailName === SubElementNameType.stroke) {
        applyColor({
          map,
          layerNames: sidewalkLayerNames.text.hasStroke,
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
          layerNames: sidewalkLayerNames.line,
          type: WeightType.line,
          weight,
        });
      }
    }
    if (detailName === ElementNameType.labelText) {
      if (subDetailName === SubElementNameType.stroke)
        applyWeight({
          map,
          layerNames: sidewalkLayerNames.text.hasStroke,
          type: WeightType.textHalo,
          weight,
        });
    }
  }
}

export default sidewalkStyling;
