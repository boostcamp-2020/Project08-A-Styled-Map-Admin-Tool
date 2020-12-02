import { stylingProps } from '.';
import {
  applyVisibility,
  applyColor,
  applyWeight,
  ColorType,
  WeightType,
} from '../applyStyle';
import {
  StyleKeyType,
  ElementNameType,
  SubElementNameType,
} from '../../store/common/type';

function roadStyling({
  map,
  subFeatureName,
  detailName,
  subDetailName,
  key,
  style,
}: stylingProps): void {
  const { visibility, color, weight } = style;
  const arterialLayerNames = [
    'road-number-shield',
    'road-exit-shield',
    'road-arterial',
    'road-arterial-label',
  ];
  const localLayerNames = [
    'ferry',
    'ferry-auto',
    'road-local',
    'road-local-label',
  ];
  const sidewalkLayerNames = ['road-footway', 'road-sidewalk-label'];

  if (subFeatureName === 'arterial') {
    if (key === 'visibility') {
      if (
        detailName === ElementNameType.section &&
        subDetailName === SubElementNameType.fill
      )
        applyVisibility({
          map,
          layerNames: localLayerNames,
          visibility,
        });
    } else if (key === 'color' || key === 'saturation' || key === 'lightness') {
      if (detailName === 'section' && subDetailName === 'fill') {
        applyColor({
          map,
          layerNames: ['road-arterial'],
          color,
          type: ColorType.line,
          [key]: style[key as StyleKeyType],
        });
      } else if (detailName === 'labelText' && subDetailName === 'fill') {
        applyColor({
          map,
          layerNames: [
            'road-number-shield',
            'road-exit-shield',
            'road-arterial-label',
          ],
          color,
          type: ColorType.text,
          [key]: style[key as StyleKeyType],
        });
      } else if (
        detailName === 'labelText' &&
        subDetailName === SubElementNameType.stroke
      ) {
        applyColor({
          map,
          layerNames: ['road-arterial-label'],
          color,
          type: ColorType.textHalo,
          [key]: style[key as StyleKeyType],
        });
      }
    } else if (key === 'weight') {
      if (detailName === 'section' && subDetailName === 'fill') {
        applyWeight({
          map,
          layerNames: ['road-arterial'],
          type: WeightType.line,
          weight,
        });
      }
      if (detailName === 'labelText' && subDetailName === 'stroke')
        applyWeight({
          map,
          layerNames: ['road-arterial-label'],
          type: WeightType.textHalo,
          weight,
        });
    }
  } else if (subFeatureName === 'local') {
    if (key === 'visibility')
      applyVisibility({ map, layerNames: localLayerNames, visibility });
    else if (key === 'color' || key === 'saturation' || key === 'lightness') {
      if (detailName === 'section' && subDetailName === 'fill')
        applyColor({
          map,
          layerNames: ['ferry', 'ferry-auto', 'road-local'],
          color,
          type: ColorType.line,
          [key]: style[key as StyleKeyType],
        });
      else if (detailName === ElementNameType.labelText) {
        if (subDetailName === SubElementNameType.fill)
          applyColor({
            map,
            layerNames: ['road-local-label'],
            color,
            type: ColorType.text,
            [key]: style[key as StyleKeyType],
          });
        else if (subDetailName === SubElementNameType.stroke)
          applyColor({
            map,
            layerNames: ['road-local-label'],
            color,
            type: ColorType.textHalo,
            [key]: style[key as StyleKeyType],
          });
      }
    } else if (key === 'weight') {
      if (detailName === 'section' && subDetailName === 'fill')
        applyWeight({
          map,
          layerNames: ['ferry', 'ferry-auto', 'road-local'],
          type: WeightType.line,
          weight,
        });
      else if (detailName === ElementNameType.labelText) {
        if (subDetailName === SubElementNameType.stroke)
          applyWeight({
            map,
            layerNames: ['road-local-label'],
            type: WeightType.textHalo,
            weight,
          });
      }
    }
  } else if (subFeatureName === 'sidewalk') {
    if (key === 'visibility') {
      if (detailName === ElementNameType.labelText)
        applyVisibility({ map, layerNames: sidewalkLayerNames, visibility });
    } else if (key === 'color' || key === 'saturation' || key === 'lightness') {
      if (detailName === 'section' && subDetailName === 'fill')
        applyColor({
          map,
          layerNames: sidewalkLayerNames,
          color,
          type: ColorType.line,
          [key]: style[key as StyleKeyType],
        });
      else if (detailName === ElementNameType.labelText) {
        if (subDetailName === SubElementNameType.fill)
          applyColor({
            map,
            layerNames: ['road-sidewalk-label'],
            color,
            type: ColorType.text,
            [key]: style[key as StyleKeyType],
          });
        else if (subDetailName === SubElementNameType.stroke)
          applyColor({
            map,
            layerNames: ['road-sidewalk-label'],
            color,
            type: ColorType.textHalo,
            [key]: style[key as StyleKeyType],
          });
      }
    } else if (key === 'weight') {
      if (
        detailName === ElementNameType.section &&
        subDetailName === SubElementNameType.fill
      )
        applyWeight({
          map,
          layerNames: sidewalkLayerNames,
          type: WeightType.line,
          weight,
        });
      else if (detailName === ElementNameType.labelText) {
        if (subDetailName === SubElementNameType.stroke)
          applyWeight({
            map,
            layerNames: ['road-sidewalk-label'],
            type: WeightType.textHalo,
            weight,
          });
      }
    }
  }
}

export default roadStyling;
