import {
  WholeStyleActionPayload,
  SubFeatureActionPayload,
  StyleActionPayload,
  ElementActionPayload,
  SubElementActionPayload,
  StyleElementPropsType,
  FeatureNameType,
  ElementNameType,
  SubElementNameType,
  StyleKeyType,
} from '../store/common/type';
import initialLayers from './rendering-data/layersColor';

/* eslint-disable no-restricted-syntax */
export default function validateStyle(
  inputStyle: WholeStyleActionPayload
): boolean {
  const features = Object.keys(inputStyle);

  for (const feature of features) {
    if (!(feature in FeatureNameType)) return false;

    const inputFeatureStyle = inputStyle[
      feature as FeatureNameType
    ] as SubFeatureActionPayload;
    const subFeatures = Object.keys(inputFeatureStyle);

    for (const subFeature of subFeatures) {
      const subFeatureStyle = inputFeatureStyle[subFeature];
      const layer = initialLayers[feature as FeatureNameType][subFeature];
      if (!layer || typeof subFeatureStyle !== 'object') return false;

      if (!checkElement(subFeatureStyle, layer)) return false;
    }
  }
  return true;
}

function checkElement(
  input: ElementActionPayload,
  origin: StyleElementPropsType
): boolean {
  const elements = Object.keys(input) as ElementNameType[];

  for (const element of elements) {
    const elementSytle = input[element];
    if (!origin[element] || typeof elementSytle !== 'object') return false;

    if (element === ElementNameType.labelIcon) {
      if (!checkStyle(elementSytle as StyleActionPayload)) return false;
    }

    if (
      element === ElementNameType.labelText ||
      element === ElementNameType.section
    ) {
      if (!checkSubElement(elementSytle as SubElementActionPayload))
        return false;
    }
  }

  return true;
}

function checkSubElement(input: SubElementActionPayload): boolean {
  const subElements = Object.keys(input) as SubElementNameType[];

  for (const subElement of subElements) {
    const subElementSytle = (input as SubElementActionPayload)[subElement];
    if (
      !(subElement in SubElementNameType) ||
      typeof subElementSytle !== 'object'
    ) {
      return false;
    }

    if (!checkStyle(subElementSytle)) return false;
  }

  return true;
}

function checkStyle(input: StyleActionPayload): boolean {
  const keys = Object.keys(input) as StyleKeyType[];

  for (const key of keys) {
    if (!(key in StyleKeyType)) return false;

    const style = input[key];
    if (key === StyleKeyType.color && !checkColor(style)) return false;
    if (
      (key === StyleKeyType.saturation || key === StyleKeyType.lightness) &&
      !checkRange(style, -100, 100)
    )
      return false;
    if (
      key === StyleKeyType.visibility &&
      typeof input.visibility !== 'boolean'
    )
      return false;
  }

  return true;
}

function checkColor<T>(inputColor: T): boolean {
  if (typeof inputColor !== 'string') return false;
  const color = inputColor.replaceAll(' ', '');
  const hslReg = /^#[0-9A-F]{6}$/;
  if (!color.match(hslReg)) return false;
  return true;
}

function checkRange<T>(input: T, min: number, max: number): boolean {
  if (typeof input !== 'number') return false;
  if (input < min || input > max) return false;
  return true;
}
