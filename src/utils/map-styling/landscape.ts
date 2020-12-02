import { stylingProps } from './index';
import { applyColor, applyVisibility, ColorType } from '../applyStyle';
import { StyleKeyType, StyleType } from '../../store/common/type';

const SECTION = 'section';
const FILL = 'fill';
const ALL = 'all';

const layers = ['human-made', 'building', 'natural', 'landcover'];

interface applyStyleProps {
  map: mapboxgl.Map;
  subFeatureName: string;
  key: StyleKeyType;
  style: StyleType;
}

function applyLandscapeStyle({
  map,
  subFeatureName,
  key,
  style,
}: applyStyleProps): void {
  const layerNames = [`landscape-${subFeatureName}`];

  switch (key) {
    case 'color':
      applyColor({
        map,
        layerNames,
        type: ColorType.fill,
        color: style.color,
      });
      break;
    case 'visibility':
      applyVisibility({ map, layerNames, visibility: style.visibility });
      break;
    case 'lightness':
      applyColor({
        map,
        layerNames,
        type: ColorType.fill,
        color: style.color,
        lightness: Number(style.lightness),
      });
      break;
    case 'saturation':
      applyColor({
        map,
        layerNames,
        type: ColorType.fill,
        color: style.color,
        saturation: Number(style.saturation),
      });
      break;
    default:
      break;
  }
}

function landscapeStyling({
  map,
  subFeatureName,
  detailName,
  subDetailName,
  key,
  style,
}: stylingProps): void {
  if (detailName !== SECTION || subDetailName !== FILL) {
    return;
  }

  if (subFeatureName === ALL) {
    layers.forEach((item) =>
      applyLandscapeStyle({ map, subFeatureName: item, key, style })
    );
  } else {
    applyLandscapeStyle({ map, subFeatureName, key, style });
  }
}

export default landscapeStyling;
