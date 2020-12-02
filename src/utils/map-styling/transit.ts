/* eslint-disable no-nested-ternary */
/* eslint-disable no-case-declarations */
import { stylingProps } from '.';

import {
  StyleKeyType,
  ElementNameType,
  SubElementNameType,
} from '../../store/common/type';
import {
  applyVisibility,
  applyColor,
  applyWeight,
  ColorType,
  WeightType,
  StyleTypes,
} from '../../utils/applyStyle';

const PolygonLayers = [
  'mapbox-airport-aeroway-polygon',
  'mapbox-airport-polygon',
];
const LineLayers = [
  'mapbox-airport-aeroway-line',
  'transit-subway-line',
  'transit-rail-line',
  'mapbox-rail-road-line',
];
const LabelLayers = ['mapbox-airport-label', 'transit-bus-label'];

function transitStyling({
  map,
  subFeatureName,
  key,
  detailName,
  subDetailName,
  style,
}: stylingProps): void {
  let layerNames: string[] =
    subDetailName === SubElementNameType.fill
      ? key === StyleKeyType.weight
        ? []
        : detailName === ElementNameType.labelText
        ? [...LabelLayers]
        : [...PolygonLayers]
      : detailName === ElementNameType.labelText
      ? [...LabelLayers]
      : [...LineLayers];

  layerNames =
    subFeatureName === 'all'
      ? layerNames
      : layerNames.filter((layer) => layer.includes(subFeatureName));

  if (layerNames.length === 0) return;

  const styleKey = key as StyleKeyType;
  const { [styleKey]: styleValue } = style;
  let styleType: StyleTypes;

  switch (styleKey) {
    case StyleKeyType.visibility:
      applyVisibility({
        map,
        layerNames,
        visibility: styleValue as string,
      });
      break;

    case StyleKeyType.color:
    case StyleKeyType.saturation:
    case StyleKeyType.lightness:
      const colorKey = StyleKeyType.color;
      const satKey = StyleKeyType.saturation;
      const ligKey = StyleKeyType.lightness;

      styleType =
        detailName === ElementNameType.labelText
          ? subDetailName === SubElementNameType.fill
            ? ColorType.text
            : ColorType.textHalo
          : subDetailName === SubElementNameType.fill
          ? ColorType.fill
          : ColorType.line;

      const satureOrLight =
        key === 'saturation'
          ? { saturation: +style[satKey] }
          : key === 'lightness'
          ? { lightness: +style[ligKey] }
          : {};
      applyColor({
        map,
        layerNames,
        type: styleType,
        color: style[colorKey],
        ...satureOrLight,
      });
      break;

    case StyleKeyType.weight:
      styleType =
        detailName === ElementNameType.labelText
          ? WeightType.textHalo
          : WeightType.line;
      applyWeight({
        map,
        layerNames,
        type: styleType,
        weight: styleValue as number,
      });

      break;

    default:
      break;
  }
}

export default transitStyling;
