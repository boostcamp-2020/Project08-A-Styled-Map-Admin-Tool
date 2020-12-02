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
  if (detailName === ElementNameType.labelIcon) return;

  if (detailName === ElementNameType.labelText) {
    // labelText - fill
    if (subDetailName === SubElementNameType.fill) {
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
  if (
    subDetailName === SubElementNameType.stroke ||
    key === StyleKeyType.weight
  )
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
