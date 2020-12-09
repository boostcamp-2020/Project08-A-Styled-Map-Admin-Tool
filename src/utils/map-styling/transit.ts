/* eslint-disable no-nested-ternary */
/* eslint-disable no-case-declarations */
import { stylingProps } from '.';
import transitLayers from '../rendering-data/layers/transit.json';
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

enum layerTypes {
  all = 'all',
  fill = 'fill',
  stroke = 'stroke',
  labelText = 'labelText',
}

interface GetLayerNamesProps {
  subFeature: string;
  element: ElementNameType;
  subElement: SubElementNameType;
  key: StyleKeyType;
}

interface GetStylePropertyTypeProps {
  styleKey: StyleKeyType;
  element: ElementNameType;
  subElement: SubElementNameType;
}

const transitLayerIds = transitLayers.transit.map(({ id }) => id);

const getLayerNames = ({
  subFeature,
  element,
  subElement,
  key,
}: GetLayerNamesProps) => {
  const isInvalidOrder = () =>
    subElement === SubElementNameType.fill && key === StyleKeyType.weight;

  if (isInvalidOrder()) return [];

  const isPolygonOrNot = (layerName: string) =>
    element === ElementNameType.section &&
    subElement === SubElementNameType.fill
      ? layerName.includes(layerTypes.fill)
      : !layerName.includes(layerTypes.fill);

  const isLabelOrNot = (layerName: string) =>
    element === ElementNameType.labelText
      ? layerName.includes(layerTypes.labelText)
      : !layerName.includes(layerTypes.labelText);

  const isAllOrSubfeature = (layerName: string) =>
    subFeature === layerTypes.all || layerName.includes(subFeature);

  const layerNames = transitLayerIds
    .filter(isLabelOrNot)
    .filter(isPolygonOrNot)
    .filter(isAllOrSubfeature);
  return layerNames;
};

const stylePropertyTypes = [
  ...Object.values(ColorType),
  ...Object.values(WeightType),
];

const getStyleType = ({
  styleKey,
  element,
  subElement,
}: GetStylePropertyTypeProps): StyleTypes => {
  const isWeight = (type: StyleTypes) =>
    styleKey === StyleKeyType.weight
      ? type.includes('width')
      : !type.includes('width');

  const isLabelText = (type: StyleTypes) =>
    element === ElementNameType.labelText
      ? type.includes('text')
      : !type.includes('text');

  const isStroke = (type: StyleTypes) => {
    const strokeReg = /(line|halo)/;
    return subElement === SubElementNameType.stroke
      ? strokeReg.test(type)
      : !strokeReg.test(type);
  };

  const [type] = stylePropertyTypes
    .filter(isWeight)
    .filter(isLabelText)
    .filter(isStroke);

  return type;
};

function transitStyling({
  map,
  subFeature,
  key,
  element,
  subElement,
  style,
}: stylingProps): void {
  if (element === ElementNameType.labelIcon) return;

  const layerNames: string[] = getLayerNames({
    subFeature,
    element,
    subElement,
    key,
  });

  if (layerNames.length === 0) return;

  const styleKey = key as StyleKeyType;
  const { [styleKey]: styleValue } = style;
  const styleType = getStyleType({
    styleKey,
    element,
    subElement,
  });

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
      const satureOrLight =
        key === StyleKeyType.saturation
          ? { saturation: +style[StyleKeyType.saturation] }
          : key === StyleKeyType.lightness
          ? { lightness: +style[StyleKeyType.lightness] }
          : {};
      applyColor({
        map,
        layerNames,
        type: styleType,
        color: style[StyleKeyType.color],
        ...satureOrLight,
      });
      break;

    case StyleKeyType.weight:
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
