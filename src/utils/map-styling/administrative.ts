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
      'administrative-country-line',
      'administrative-country-bg-line',
      'administrative-country-line-disputed',
    ],
    symbol: ['administrative-country-labelText'],
  },
  state: {
    line: ['administrative-state-bg-line', 'administrative-state-line'],
    symbol: ['administrative-state-labelText'],
  },
  locality: {
    line: [],
    symbol: [
      'administrative-settlement-labelText',
      'administrative-settlement-subdivision-labelText',
    ],
  },
  all: {
    line: [
      'administrative-country-line',
      'administrative-country-bg-line',
      'administrative-country-line-disputed',
      'administrative-state-bg-line',
      'administrative-state-line',
    ],
    symbol: [
      'administrative-country-labelText',
      'administrative-state-labelText',
      'administrative-settlement-labelText',
      'administrative-settlement-subdivision-labelText',
    ],
  },
};

function administrativeStyling({
  map,
  subFeature,
  element,
  subElement,
  key,
  style,
}: stylingProps): void {
  const mappingLayers = layers[subFeature as subFeatureNameType];

  if (element === ElementNameType.labelIcon) return;
  if (element === ElementNameType.labelText) {
    // labelText - fill
    if (subElement === SubElementNameType.fill) {
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
  if (subFeature === 'locality' || subElement === SubElementNameType.fill)
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
