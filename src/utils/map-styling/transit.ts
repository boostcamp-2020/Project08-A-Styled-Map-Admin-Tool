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
  let layers: string[];
  switch (subFeatureName) {
    case 'all':
      layers = [...AllLayerTypeKeys];
      break;
    case 'subway':
      layers = [...SubwayLayerNames];
      break;
    case 'bus':
      layers = [...BusLayerNames];
      break;
    case 'airport':
      layers = [...AirportLayerNames];
      break;
    case 'rail':
      layers = [...RailLayerNames];
      break;
    default:
      return;
  }

  let layersByDetailName: string[];
  let styleType: StyleTypes;

  switch (detailName) {
    case ElementNameType.section:
      layersByDetailName = layers.filter((layer) => !layer.includes('label'));
      styleType =
        subDetailName === SubElementNameType.stroke
          ? key === StyleKeyType.weight
            ? WeightType.line
            : ColorType.line
          : ColorType.fill;

      break;
    case ElementNameType.labelText:
      layersByDetailName = layers.filter((layer) => layer.includes('label'));
      styleType =
        subDetailName === SubElementNameType.stroke
          ? key === StyleKeyType.weight
            ? WeightType.textHalo
            : ColorType.textHalo
          : ColorType.text;
      break;
    case ElementNameType.labelIcon:
      layersByDetailName = layers.filter((layer) => !layer.includes('label'));
      styleType =
        subDetailName === SubElementNameType.stroke
          ? ColorType.line
          : ColorType.fill;
      break;

    default:
      return;
  }

  const styleKey: StyleKeyType = key as StyleKeyType;
  const { [styleKey]: value } = style;

  switch (styleKey) {
    case StyleKeyType.visibility:
      applyVisibility({
        map,
        layerNames: layersByDetailName,
        visibility: value as string,
      });
      break;

    case StyleKeyType.color:
    case StyleKeyType.saturation:
    case StyleKeyType.lightness:
      const colorKey = StyleKeyType.color;
      const satKey = StyleKeyType.saturation;
      const ligKey = StyleKeyType.lightness;

      const satureOrLight =
        key === 'saturation'
          ? { saturation: +style[satKey] }
          : key === 'lightness'
          ? { lightness: +style[ligKey] }
          : {};
      applyColor({
        map,
        layerNames: layersByDetailName,
        type: styleType,
        color: style[colorKey],
        ...satureOrLight,
      });
      break;

    case StyleKeyType.weight:
      if (subDetailName !== 'fill') {
        applyWeight({
          map,
          layerNames: layersByDetailName,
          type: styleType as WeightType,
          weight: value as number,
        });
      }

      break;

    default:
      break;
  }
}

export default transitStyling;
