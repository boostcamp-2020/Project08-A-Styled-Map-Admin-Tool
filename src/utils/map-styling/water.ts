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

const layers = {
  polygon: ['water-polygon', 'water'],
  symbol: ['water-line-label', 'water-point-label', 'waterway-label'],
};

function waterStyling({
  map,
  detailName,
  subDetailName,
  key,
  style,
}: stylingProps): void {
  if (detailName === ElementName.labelIcon) return;

  if (detailName === ElementName.labelText) {
    // labelText - fill
    if (subDetailName === SubElementName.fill) {
      if (key === StyleKeyName.weight) return;
      if (key === StyleKeyName.visibility) {
        const styleValue = style[key] === 'none' ? 'none' : 'visible';
        applyVisibility(map, layers.symbol, styleValue);
        return;
      }

      applyColor({
        map,
        layerNames: layers.symbol,
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
        layers.symbol,
        WeightTypeName['text-halo-width'],
        styleValue
      );
      return;
    }

    applyColor({
      map,
      layerNames: layers.symbol,
      type: ColorTypeName['text-halo-color'],
      color: style.color,
      [key]: style[key],
    });
    return;
  }

  // section - stroke
  if (subDetailName === SubElementName.stroke || key === StyleKeyName.weight)
    return;

  // section - fill
  if (key === StyleKeyName.visibility) {
    const styleValue = style[key] === 'none' ? 'none' : 'visible';
    applyVisibility(map, layers.polygon, styleValue);
    return;
  }

  applyColor({
    map,
    layerNames: layers.polygon,
    type: ColorTypeName['fill-color'],
    color: style.color,
    [key]: style[key],
  });
}

export default waterStyling;
