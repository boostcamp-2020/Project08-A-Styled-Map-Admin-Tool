import { stylingProps } from '.';
import {
  ElementNameType,
  SubElementNameType,
  StyleKeyType,
} from '../../store/common/type';
import {
  ColorType,
  WeightType,
  applyVisibility,
  applyColor,
  applyWeight,
} from '../applyStyle';

type subFeatureNameType = 'country' | 'state' | 'locality' | 'all';

const layers = {
  country: {
    line: [
      'admin-0-boundary',
      'admin-0-boundary-bg',
      'admin-0-boundary-disputed',
    ],
    symbol: ['country-label'],
  },
  state: {
    line: ['admin-1-boundary-bg', 'admin-1-boundary'],
    symbol: ['state-label'],
  },
  locality: {
    line: [],
    symbol: ['settlement-label', 'settlement-subdivision-label'],
  },
  all: {
    line: [
      'admin-0-boundary',
      'admin-0-boundary-bg',
      'admin-0-boundary-disputed',
      'admin-1-boundary-bg',
      'admin-1-boundary',
    ],
    symbol: [
      'country-label',
      'settlement-label',
      'settlement-subdivision-label',
      'state-label',
    ],
  },
};

function administrativeStyling({
  map,
  subFeatureName,
  detailName,
  subDetailName,
  key,
  style,
}: stylingProps): void {
  const mappingLayers = layers[subFeatureName as subFeatureNameType];

  if (detailName === ElementNameType.labelIcon) return;
  if (detailName === ElementNameType.labelText) {
    // labelText - fill
    if (subDetailName === SubElementNameType.fill) {
      if (key === StyleKeyType.weight) return;
      if (key === StyleKeyType.visibility) {
        const styleValue = style[key] === 'none' ? 'none' : 'visible';
        applyVisibility({
          map,
          layerNames: mappingLayers.symbol,
          visibility: styleValue,
        });
        return;
      }

      applyColor({
        map,
        layerNames: mappingLayers.symbol,
        type: ColorType.text,
        color: style.color,
        [key]: style[key],
      });
      return;
    }

    // labelText - stroke
    if (key === StyleKeyType.weight || key === StyleKeyType.visibility) {
      const styleValue = style.visibility === 'none' ? 0 : Number(style.weight);
      applyWeight({
        map,
        layerNames: mappingLayers.symbol,
        type: WeightType.textHalo,
        weight: styleValue,
      });
      return;
    }

    applyColor({
      map,
      layerNames: mappingLayers.symbol,
      type: ColorType.textHalo,
      color: style.color,
      [key]: style[key],
    });
    return;
  }

  // section - fill
  if (
    subFeatureName === 'locality' ||
    subDetailName === SubElementNameType.fill
  )
    return;

  // section - stroke
  if (key === StyleKeyType.weight || key === StyleKeyType.visibility) {
    const styleValue = style.visibility === 'none' ? 0 : Number(style.weight);
    applyWeight({
      map,
      layerNames: mappingLayers.line,
      type: WeightType.line,
      weight: styleValue,
    });
    return;
  }

  applyColor({
    map,
    layerNames: mappingLayers.line,
    type: ColorType.line,
    color: style.color,
    [key]: style[key],
  });
}

export default administrativeStyling;
