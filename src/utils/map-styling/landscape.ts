import { stylingProps } from './index';
import {
  applyColor,
  applyLightness,
  applyVisibility,
  applySaturation,
} from '../applyStyle';

function landscapeStyling({
  map,
  subFeatureName,
  detailName,
  subDetailName,
  style,
}: stylingProps): void {
  const layerName = `landscape-${subFeatureName}`;

  if (detailName === 'section' && subDetailName === 'fill') {
    applyColor(map, layerName, 'fill-color', style.color);
    applyVisibility(map, layerName, style.visibility);
    applyLightness(
      map,
      layerName,
      'fill-color',
      style.color,
      Number(style.lightness)
    );
    applySaturation(
      map,
      layerName,
      'fill-color',
      style.color,
      Number(style.saturation)
    );
  }
}

export default landscapeStyling;
