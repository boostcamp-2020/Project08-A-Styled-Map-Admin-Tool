import {
  URLJsonType,
  URLJsonSubElementType,
  URLJsonStyleType,
  URLJsonElementType,
  URLJsonSubFeatureType,
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
  const url = 'http://localhost:3000/map?=';
  const queryString = `${jsonToURLGetQueryString(json)}end`;

  return url + queryString;
}
