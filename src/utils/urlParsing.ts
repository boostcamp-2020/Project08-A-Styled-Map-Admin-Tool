import {
  /** JSONURL */
  URLJsonType,
  URLJsonSubElementType,
  URLJsonStyleType,
  URLJsonElementType,
  URLJsonSubFeatureType,
  /** property */
  FeatureNameType,
  SubFeatureNameType,
  ElementNameType,
  SubElementNameType,
  StyleKeyType,
} from '../store/common/type';

function jsonToURLGetQueryString(
  json:
    | URLJsonType
    | URLJsonSubElementType
    | URLJsonStyleType
    | URLJsonElementType
    | URLJsonSubFeatureType
): string {
  return Object.entries(json).reduce((queryString: string, property) => {
    const [key, value] = property;
    if (typeof value === 'object') {
      return `${queryString}${key}:${jsonToURLGetQueryString(value)}`;
    }
    return `${queryString}${key}:${value}:`;
  }, '');
}

export function jsonToURL(json: URLJsonType): string {
  const url = 'http://localhost:3000/show?=';
  const queryString = `${jsonToURLGetQueryString(json)}end`;

  return url + queryString;
}

export function urlToJson(): URLJsonType | null {
  const queryString = window.location.search;

  const values = queryString?.split('=')[1]?.split(':');
  const state: any = {};
  const properties = {
    feature: '',
    subFeature: '',
    element: '',
    subElement: '',
  };

  try {
    values?.forEach((value, index) => {
      const { feature, subFeature, element, subElement } = properties;
      if (Object.keys(FeatureNameType).includes(value)) {
        state[value] = {};
        properties.feature = value;
      } else if (Object.keys(SubFeatureNameType).includes(value)) {
        state[feature][value] = {};
        properties.subFeature = value;
      } else if (Object.keys(ElementNameType).includes(value)) {
        state[feature][subFeature][value] = {};
        properties.element = value;
      } else if (Object.keys(SubElementNameType).includes(value)) {
        state[feature][subFeature][element][value] = {};
        properties.subElement = value;
      } else if (Object.keys(StyleKeyType).includes(value)) {
        if (element === ElementNameType.labelIcon) {
          state[feature][subFeature][element][value] = values[index + 1];
          return;
        }
        state[feature][subFeature][element][subElement][value] =
          values[index + 1];
      }
    });
  } catch (error) {
    return null;
  }

  return state;
}
