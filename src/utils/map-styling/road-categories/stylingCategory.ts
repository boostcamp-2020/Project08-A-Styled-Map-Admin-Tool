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
import weightTemplate from '../../rendering-data/layers/weightTemplate';

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
  subFeature: string;
  element: ElementNameType;
  subElement: SubElementNameType;
  key: StyleKeyType;
  style: StyleType;
  layerNames: layerProps;
}

function stylingCategory({
  layerNames,
  map,
  subFeature,
  element,
  subElement,
  key,
  style,
}: catergoryStylingProps): void {
  const { visibility, color, weight } = style;
  if (key === StyleKeyType.visibility) {
    if (element === ElementNameType.section) {
      if (subElement === SubElementNameType.fill) {
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
      } else if (subElement === SubElementNameType.stroke)
        applyVisibility({
          map,
          layerNames: layerNames.stroke,
          visibility,
        });
    } else if (element === ElementNameType.labelText) {
      if (subElement === SubElementNameType.fill)
        applyVisibility({
          map,
          layerNames: layerNames.text.all,
          visibility,
        });
      else if (subElement === SubElementNameType.stroke) {
        if (visibility === 'none')
          applyWeight({
            map,
            layerNames: layerNames.text.hasStroke,
            type: WeightType.textHalo,
            weight: 0,
          });
        else if (visibility === 'visible' || visibility === 'inherit')
          applyWeight({
            map,
            layerNames: layerNames.text.hasStroke,
            type: WeightType.textHalo,
            weight: weight === 0 ? 1 : weight,
          });
      }
    } else if (element === ElementNameType.labelIcon) {
      applyVisibility({
        map,
        layerNames: layerNames.icon,
        visibility,
      });
    }
  } else if (
    key === StyleKeyType.color ||
    key === StyleKeyType.saturation ||
    key === StyleKeyType.lightness
  ) {
    if (element === ElementNameType.section) {
      if (subElement === SubElementNameType.fill) {
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
      } else if (subElement === SubElementNameType.stroke) {
        applyColor({
          map,
          layerNames: layerNames.stroke,
          color,
          type: ColorType.line,
          [key]: style[key as StyleKeyType],
        });
      }
    } else if (element === ElementNameType.labelText) {
      if (subElement === SubElementNameType.fill) {
        applyColor({
          map,
          layerNames: layerNames.text.all,
          color,
          type: ColorType.text,
          [key]: style[key as StyleKeyType],
        });
      } else if (subElement === SubElementNameType.stroke) {
        applyColor({
          map,
          layerNames: layerNames.text.hasStroke,
          color,
          type: ColorType.textHalo,
          [key]: style[key as StyleKeyType],
        });
      }
    }
  } else if (key === StyleKeyType.weight) {
    if (element === ElementNameType.section) {
      if (subElement === SubElementNameType.fill) {
        let zoomWeight = 0;
        if (weightTemplate[subFeature]) {
          zoomWeight = weightTemplate[subFeature][subElement](weight);
        }
        applyWeight({
          map,
          layerNames: layerNames.line,
          type: WeightType.line,
          weight: zoomWeight || weight,
        });
      } else if (subElement === SubElementNameType.stroke) {
        applyWeight({
          map,
          layerNames: layerNames.stroke,
          type: WeightType.line,
          weight,
        });
      }
    }
    if (element === ElementNameType.labelText) {
      if (
        subElement === SubElementNameType.stroke &&
        visibility === 'visible'
      ) {
        let zoomWeight = 0;
        if (weightTemplate[subFeature]) {
          zoomWeight = weightTemplate[subFeature][subElement](weight);
        }
        applyWeight({
          map,
          layerNames: layerNames.text.hasStroke,
          type: WeightType.textHalo,
          weight: zoomWeight || weight,
        });
      }
    }
  }
}

export default stylingCategory;
