import { stylingProps } from '.';
import {
  ElementName,
  SubElementName,
  StyleKeyName,
} from '../../store/common/type';
import {
  ColorTypeName,
  WeightTypeName,
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
    symbol: ['settlement-label', 'settlement_subdivision-label'],
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
      'settlement_subdivision-label',
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

  if (detailName === ElementName.labelIcon) return;
  if (detailName === ElementName.labelText) {
    // labelText - fill
    if (subDetailName === SubElementName.fill) {
      if (key === StyleKeyName.weight) return;
      if (key === StyleKeyName.visibility) {
        const styleValue = style[key] === 'none' ? 'none' : 'visible';
        applyVisibility(map, mappingLayers.symbol, styleValue);
        return;
      }

      applyColor({
        map,
        layerNames: mappingLayers.symbol,
        type: ColorTypeName['text-color'],
        color: style.color,
        [key]: style[key],
      });
      return;
    }

    // labelText - stroke
    if (key === StyleKeyName.weight || key === StyleKeyName.visibility) {
      const styleValue = style.visibility === 'none' ? 0 : Number(style.weight);
      applyWeight(
        map,
        mappingLayers.symbol,
        WeightTypeName['text-halo-width'],
        styleValue
      );
      return;
    }

    applyColor({
      map,
      layerNames: mappingLayers.symbol,
      type: ColorTypeName['text-halo-color'],
      color: style.color,
      [key]: style[key],
    });
    return;
  }

  // section - fill
  if (subFeatureName === 'locality' || subDetailName === SubElementName.fill)
    return;

  // section - stroke
  if (key === StyleKeyName.weight || key === StyleKeyName.visibility) {
    const styleValue = style.visibility === 'none' ? 0 : Number(style.weight);
    applyWeight(
      map,
      mappingLayers.line,
      WeightTypeName['line-width'],
      styleValue
    );
    return;
  }

  applyColor({
    map,
    layerNames: mappingLayers.line,
    type: ColorTypeName['line-color'],
    color: style.color,
    [key]: style[key],
  });
}

export default administrativeStyling;
