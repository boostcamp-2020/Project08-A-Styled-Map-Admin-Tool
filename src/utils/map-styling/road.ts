import { stylingProps } from '.';
import {
  applyVisibility,
  applyColor,
  applyWeight,
  ColorType,
  WeightType,
} from '../applyStyle';
import { StyleKeyType } from '../../store/common/type';

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
    'road-label',
    'road-arterial',
  ];
  const localLayerNames = ['ferry', 'ferry-auto', 'road-local'];
  const sidewalkLayerNames = ['road-footway'];

  if (subFeatureName === 'arterial') {
    if (
      detailName === 'section' &&
      subDetailName === 'fill' &&
      key === 'visibility'
    ) {
      applyVisibility({ map, layerNames: arterialLayerNames, visibility });
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
          layerNames: ['road-number-shield', 'road-exit-shield', 'road-label'],
          color,
          type: ColorType.text,
          [key]: style[key as StyleKeyType],
        });
      } else if (detailName === 'labelText' && subDetailName === 'stroke') {
        applyColor({
          map,
          layerNames: ['road-label'],
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
          layerNames: ['road-label'],
          type: ColorType.textHalo,
          weight,
        });
    }
  } else if (subFeatureName === 'local') {
    if (key === 'visibility')
      applyVisibility({ map, layerNames: localLayerNames, visibility });
    else if (key === 'color' || key === 'saturation' || key === 'lightness') {
      if (detailName === 'section' && subDetailName === 'fill') {
        applyColor({
          map,
          layerNames: ['ferry', 'ferry-auto', 'road-local'],
          color,
          type: ColorType.line,
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
    }
  } else if (subFeatureName === 'sidewalk') {
    if (key === 'visibility')
      applyVisibility({ map, layerNames: sidewalkLayerNames, visibility });
    else if (key === 'weight') {
      if (detailName === 'section' && subDetailName === 'fill')
        applyWeight({
          map,
          layerNames: sidewalkLayerNames,
          type: WeightType.line,
          weight,
        });
    } else if (key === 'color' || key === 'saturation' || key === 'lightness') {
      if (detailName === 'section' && subDetailName === 'fill')
        applyColor({
          map,
          layerNames: sidewalkLayerNames,
          color,
          type: ColorType.line,
          [key]: style[key as StyleKeyType],
        });
    }
  }
}

export default roadStyling;
