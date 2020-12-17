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
  VisibilityValueType,
  StyleKeyType,
} from '../store/common/type';
import initialLayers from './rendering-data/defaultStyle';

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
      const initialSubFeatureStyle =
        initialLayers[feature as FeatureNameType][subFeature];

      if (
        !initialSubFeatureStyle ||
        typeof subFeatureStyle !== 'object' ||
        !checkElement({
          subFeatureStyle,
          initialSubFeatureStyle: initialSubFeatureStyle as StyleElementPropsType,
        })
      ) {
        return false;
      }
    }
  }
  return true;
}

interface checkElementProps {
  subFeatureStyle: ElementActionPayload;
  initialSubFeatureStyle: StyleElementPropsType;
}

function checkElement({
  subFeatureStyle,
  initialSubFeatureStyle,
}: checkElementProps): boolean {
  const elements = Object.keys(subFeatureStyle) as ElementNameType[];

  for (const element of elements) {
    const elementSytle = subFeatureStyle[element];
    if (!initialSubFeatureStyle[element] || typeof elementSytle !== 'object')
      return false;

    if (
      element === ElementNameType.labelIcon &&
      !checkStyle(elementSytle as StyleActionPayload)
    ) {
      return false;
    }

    if (
      (element === ElementNameType.labelText ||
        element === ElementNameType.section) &&
      !checkSubElement(elementSytle as SubElementActionPayload)
    ) {
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
      typeof subElementSytle !== 'object' ||
      !checkStyle(subElementSytle as StyleActionPayload)
    ) {
      return false;
    }
  }

  return true;
}

function checkStyle(input: StyleActionPayload): boolean {
  const keys = Object.keys(input) as StyleKeyType[];
  for (const key of keys) {
    if (!(key in StyleKeyType)) return false;
    const style = input[key];
    switch (key) {
      case StyleKeyType.color:
        if (!checkColor(style)) return false;
        break;
      case StyleKeyType.weight:
        if (!checkRange(style, 0, 8)) return false;
        break;
      case StyleKeyType.visibility:
        if (!((input.visibility as VisibilityValueType) in VisibilityValueType))
          return false;
        break;
      default:
        return false;
    }
  }

  return true;
}

function checkColor<T>(inputColor: T): boolean {
  if (typeof inputColor !== 'string') return false;
  const color = inputColor.replaceAll(' ', '');
  const hexReg = /^#[0-9A-F]{6}$/i;
  if (!color.match(hexReg)) return false;
  return true;
}

function checkRange<T>(input: T, min: number, max: number): boolean {
  if (typeof input !== 'number') return false;
  if (input < min || input > max) return false;
  return true;
}
