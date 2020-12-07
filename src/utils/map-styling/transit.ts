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
const LineLayers = ['mapbox-airport-aeroway-line', 'mapbox-rail-road-line'];
const LabelLayers = ['mapbox-airport-label'];

function transitStyling({
  map,
  subFeature,
  key,
  element,
  subElement,
  style,
}: stylingProps): void {
  // TODO: labelIcon 관련 구현
  if (element === ElementNameType.labelIcon) return;

  let layerNames: string[] =
    subElement === SubElementNameType.fill
      ? key === StyleKeyType.weight
        ? []
        : element === ElementNameType.labelText
        ? [...LabelLayers]
        : [...PolygonLayers]
      : element === ElementNameType.labelText
      ? [...LabelLayers]
      : [...LineLayers];

  layerNames =
    subFeature === 'all'
      ? layerNames
      : layerNames.filter((layer) => layer.includes(subFeature));

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
        element === ElementNameType.labelText
          ? subElement === SubElementNameType.fill
            ? ColorType.text
            : ColorType.textHalo
          : subElement === SubElementNameType.fill
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
        element === ElementNameType.labelText
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
