import { stylingProps } from './index';
import {
  applyColor,
  applyLightness,
  applyVisibility,
  applySaturation,
} from '../applyStyle';
import { StyleType } from '../../store/common/type';

const SECTION = 'section';
const FILL = 'fill';
const ALL = 'all';

const layers = ['human-made', 'building', 'natural', 'landcover'];

interface applyStyleProps {
  map: mapboxgl.Map;
  subFeatureName: string;
  style: StyleType;
}

function applyLandscapeStyle({ map, subFeatureName, style }: applyStyleProps) {
  const layerName = `landscape-${subFeatureName}`;

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

function landscapeStyling({
  map,
  subFeatureName,
  detailName,
  subDetailName,
  style,
}: stylingProps): void {
  if (detailName !== SECTION || subDetailName !== FILL) {
    return;
  }

  if (subFeatureName === ALL) {
    layers.forEach((item) =>
      applyLandscapeStyle({ map, subFeatureName: item, style })
    );
  } else {
    applyLandscapeStyle({ map, subFeatureName, style });
  }
}

export default landscapeStyling;
