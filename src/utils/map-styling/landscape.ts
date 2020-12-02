import { stylingProps } from './index';
import { applyColor, applyVisibility, ColorType } from '../applyStyle';
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
  const layerNames = [`landscape-${subFeatureName}`];

  applyColor({ map, layerNames, type: ColorType.fill, color: style.color });
  applyVisibility({ map, layerNames, visibility: style.visibility });
  applyColor({
    map,
    layerNames,
    type: ColorType.fill,
    color: style.color,
    lightness: Number(style.lightness),
  });
  applyColor({
    map,
    layerNames,
    type: ColorType.fill,
    color: style.color,
    saturation: Number(style.saturation),
  });
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
