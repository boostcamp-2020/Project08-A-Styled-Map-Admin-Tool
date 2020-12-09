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

const layers = {
  polygon: [
    'water-all-section-fill-1',
    'water-all-section-fill-2',
    'water-all-section-fill-3',
  ],
  symbol: [
    'water-all-labelText-1',
    'water-all-labelText-2',
    'water-all-labelText-3',
  ],
};

function waterStyling({
  map,
  element,
  subElement,
  key,
  style,
}: stylingProps): void {
  if (element === ElementNameType.labelIcon) return;

  if (element === ElementNameType.labelText) {
    // labelText - fill
    if (subElement === SubElementNameType.fill) {
      if (key === StyleKeyType.weight) return;
      if (key === StyleKeyType.visibility) {
        const styleValue = style[key] === 'none' ? 'none' : 'visible';
        applyVisibility({
          map,
          layerNames: layers.symbol,
          visibility: styleValue,
        });
        return;
      }

      applyColor({
        map,
        layerNames: layers.symbol,
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
        layerNames: layers.symbol,
        type: WeightType.textHalo,
        weight: styleValue,
      });
      return;
    }

    applyColor({
      map,
      layerNames: layers.symbol,
      type: ColorType.textHalo,
      color: style.color,
      [key]: style[key],
    });
    return;
  }

  // section - stroke
  if (subElement === SubElementNameType.stroke || key === StyleKeyType.weight)
    return;

  // section - fill
  if (key === StyleKeyType.visibility) {
    const styleValue = style[key] === 'none' ? 'none' : 'visible';
    applyVisibility({
      map,
      layerNames: layers.polygon,
      visibility: styleValue,
    });
    return;
  }

  applyColor({
    map,
    layerNames: layers.polygon,
    type: ColorType.fill,
    color: style.color,
    [key]: style[key],
  });
}

export default waterStyling;
