/* eslint-disable no-nested-ternary */
/* eslint-disable no-debugger */
/* eslint-disable no-case-declarations */
import { stylingProps } from '.';
import { StyleKeyName, StyleType } from '../../store/common/type';
import {
  applyVisibility,
  applyColor,
  applyWeight,
  applyTextSize,
  ColorTypeName,
  styleTypes,
  WeightTypeName,
} from '../../utils/applyStyle';

const AirportLayerNames = [
  'airport-label',

  'aeroway-polygon',
  'transit-airport',
  'aeroway-line',
];
const BusLayerNames = ['transit-bus-label'];
const RailLayerNames = ['transit-rail'];
const SubwayLayerNames = ['transit-subway', 'transit-subway-label'];

const AllLayerTypeKeys = [
  ...AirportLayerNames,
  ...BusLayerNames,
  ...RailLayerNames,
  ...SubwayLayerNames,
  'transit-label',
];

function transitStyling({
  map,
  subFeatureName,
  key,
  detailName,
  subDetailName,
  style,
}: stylingProps): void {
  const layers =
    subFeatureName === 'all'
      ? [...AllLayerTypeKeys]
      : subFeatureName === 'subway'
      ? [...SubwayLayerNames]
      : subFeatureName === 'bus'
      ? [...BusLayerNames]
      : subFeatureName === 'airport'
      ? [...AirportLayerNames]
      : [...RailLayerNames];

  let layersByDetailName: string[];
  let styleType: styleTypes;
  debugger;
  switch (detailName) {
    case 'section':
      layersByDetailName = layers.filter((layer) => !layer.includes('label'));
      styleType =
        subDetailName === 'stroke'
          ? key === 'weight'
            ? WeightTypeName['line-width']
            : ColorTypeName['line-color']
          : ColorTypeName['fill-color'];

      break;
    case 'labelText':
      layersByDetailName = layers.filter((layer) => layer.includes('label'));
      styleType =
        subDetailName === 'stroke'
          ? key === 'weight'
            ? WeightTypeName['text-halo-width']
            : ColorTypeName['text-halo-color']
          : key === 'weight'
          ? WeightTypeName['text-size']
          : ColorTypeName['text-color'];
      debugger;
      break;
    case 'labelIcon':
      layersByDetailName = layers.filter((layer) => !layer.includes('label'));
      styleType =
        subDetailName === 'stroke'
          ? ColorTypeName['line-color']
          : ColorTypeName['fill-color'];
      break;

    default:
      return;
  }

  const styleKey: StyleKeyName = key as StyleKeyName;
  const { [styleKey]: value } = style;
  let stylerFunction: (obj: any) => void;

  switch (styleKey) {
    case StyleKeyName.visibility:
      stylerFunction = ({ layerNames }: { layerNames: string[] }) =>
        applyVisibility(map, layerNames, value as string);
      break;

    case StyleKeyName.color:
    case StyleKeyName.saturation:
    case StyleKeyName.lightness:
      const colorKey = StyleKeyName.color;
      const satKey = StyleKeyName.saturation;
      const ligKey = StyleKeyName.lightness;

      const satureOrLight =
        key === 'saturation'
          ? { saturation: +style[satKey] }
          : key === 'lightness'
          ? { lightness: +style[ligKey] }
          : {};
      stylerFunction = ({ layerNames }: { layerNames: string[] }) =>
        applyColor({
          map,
          layerNames,
          type: styleType,
          color: style[colorKey],
          ...satureOrLight,
        });
      break;

    case StyleKeyName.weight:
      stylerFunction =
        subDetailName !== 'fill'
          ? ({ layerNames }: { layerNames: string[] }) =>
              applyWeight(
                map,
                layerNames,
                styleType as WeightTypeName,
                value as string
              )
          : ({ layerNames }: { layerNames: string[] }) =>
              applyTextSize(
                map,
                layerNames,
                styleType as WeightTypeName,
                value as string
              );
      break;

    default:
      return;
  }

  stylerFunction({ layerNames: layersByDetailName });
}

export default transitStyling;
