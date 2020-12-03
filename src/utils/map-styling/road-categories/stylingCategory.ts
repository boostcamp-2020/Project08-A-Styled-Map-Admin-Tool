import {
  applyVisibility,
  applyColor,
  applyWeight,
  ColorType,
  WeightType,
} from '../../applyStyle';
import mapboxgl from 'mapbox-gl';
import {
  ElementNameType,
  SubElementNameType,
  StyleKeyType,
  StyleType,
} from '../../../store/common/type';

export interface layerProps {
  all: string[];
  polygon: string[];
  line: string[];
  stroke: string[];
  text: {
    all: string[];
    hasStroke: string[];
    noStroke: string[];
  };
  icon: string[];
}

export interface catergoryStylingProps {
  map: mapboxgl.Map;
  subFeatureName: string;
  detailName: ElementNameType;
  subDetailName: SubElementNameType;
  key: StyleKeyType;
  style: StyleType;
  layerNames: layerProps;
}

function stylingCategory({
  layerNames,
  map,
  subFeatureName,
  detailName,
  subDetailName,
  key,
  style,
}: catergoryStylingProps): void {
  const { visibility, color, weight } = style;

  if (key === 'visibility') {
    if (detailName === ElementNameType.section) {
      if (subDetailName === SubElementNameType.fill) {
        applyVisibility({
          map,
          layerNames: layerNames.line,
          visibility,
        });
        applyVisibility({
          map,
          layerNames: layerNames.polygon,
          visibility,
        });
      } else if (subDetailName === SubElementNameType.stroke)
        applyVisibility({
          map,
          layerNames: layerNames.stroke,
          visibility,
        });
    } else if (detailName === ElementNameType.labelText) {
      if (subDetailName === SubElementNameType.fill)
        applyVisibility({
          map,
          layerNames: layerNames.text.noStroke,
          visibility,
        });
      else if (subDetailName === SubElementNameType.stroke)
        applyVisibility({
          map,
          layerNames: layerNames.text.hasStroke,
          visibility,
        });
    }
  } else if (key === 'color' || key === 'saturation' || key === 'lightness') {
    if (detailName === ElementNameType.section) {
      if (subDetailName === SubElementNameType.fill) {
        applyColor({
          map,
          layerNames: layerNames.line,
          color,
          type: ColorType.line,
          [key]: style[key as StyleKeyType],
        });
        applyColor({
          map,
          layerNames: layerNames.polygon,
          color,
          type: ColorType.fill,
          [key]: style[key as StyleKeyType],
        });
      } else if (subDetailName === SubElementNameType.stroke) {
        applyColor({
          map,
          layerNames: layerNames.stroke,
          color,
          type: ColorType.line,
          [key]: style[key as StyleKeyType],
        });
      }
    } else if (detailName === ElementNameType.labelText) {
      if (subDetailName === SubElementNameType.fill) {
        applyColor({
          map,
          layerNames: layerNames.text.all,
          color,
          type: ColorType.text,
          [key]: style[key as StyleKeyType],
        });
      } else if (subDetailName === SubElementNameType.stroke) {
        applyColor({
          map,
          layerNames: layerNames.text.hasStroke,
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
          layerNames: layerNames.line,
          type: WeightType.line,
          weight,
        });
      } else if (subDetailName === SubElementNameType.stroke) {
        applyWeight({
          map,
          layerNames: layerNames.stroke,
          type: WeightType.line,
          weight,
        });
      }
    }
    if (detailName === ElementNameType.labelText) {
      if (subDetailName === SubElementNameType.stroke)
        applyWeight({
          map,
          layerNames: layerNames.text.hasStroke,
          type: WeightType.textHalo,
          weight,
        });
    }
  }
}

export default stylingCategory;
