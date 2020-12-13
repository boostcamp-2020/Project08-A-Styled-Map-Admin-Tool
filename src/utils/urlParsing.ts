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
  /** export */
  LocationType,
} from '../store/common/type';

function jsonToURLGetStyleQueryString(
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
      return `${queryString}${key}:${jsonToURLGetStyleQueryString(value)}`;
    }
    return `${queryString}${key}:${value}:`;
  }, '');
}

function jsonToURLGetStyleLocationString(location: LocationType): string {
  return Object.entries(location).reduce(
    (queryString: string, [key, value]) => {
      return `${queryString}${key}:${value ?? ''}:`;
    },
    ''
  );
}

export function jsonToURL(json: URLJsonType): string {
  const url = 'http://map-styler.kro.kr/show?=';
  const styleQueryString = `style=${encodeURIComponent(
    jsonToURLGetStyleQueryString(json?.filteredStyle as URLJsonType)
  )}end`;
  const locationQueryString = `location=${encodeURIComponent(
    jsonToURLGetStyleLocationString(json?.mapCoordinate as LocationType)
  )}`;

  return url + locationQueryString + styleQueryString;
}

function urlToJsonGetStyleJson(queryString: string): URLJsonType | null {
  try {
    const values = queryString?.split('style=')[1]?.split(':');
    const state: any = {};
    const properties = {
      feature: '',
      subFeature: '',
      element: '',
      subElement: '',
    };

    values?.forEach((value, index) => {
      const { feature, subFeature, element, subElement } = properties;
      if (value in FeatureNameType) {
        state[value] = {};
        properties.feature = value;
      } else if (value in SubFeatureNameType) {
        state[feature][value] = {};
        properties.subFeature = value;
      } else if (value in ElementNameType) {
        state[feature][subFeature][value] = {};
        properties.element = value;
      } else if (value in SubElementNameType) {
        state[feature][subFeature][element][value] = {};
        properties.subElement = value;
      } else if (value in StyleKeyType) {
        if (element === ElementNameType.labelIcon) {
          state[feature][subFeature][element][value] = values[index + 1];
          return;
        }
        state[feature][subFeature][element][subElement][value] =
          values[index + 1];
      }
    });
    return state;
  } catch (error) {
    return null;
  }
}

function urlToJsonGetLocationJson(queryString: string): any {
  try {
    const values = queryString
      ?.split('location=')[1]
      .split('style=')[0]
      ?.split(':');

    const state: any = {};
    for (let i = 0; i < values.length; i += 2) {
      state[values[i]] = Number(values[i + 1]);
    }
    return state;
  } catch (error) {
    return null;
  }
}

export function urlToJson(): URLJsonType {
  const queryString = decodeURIComponent(window.location.search);
  const state = {
    filteredStyle: urlToJsonGetStyleJson(queryString) as URLJsonSubFeatureType,
    mapCoordinate: urlToJsonGetLocationJson(queryString),
  };

  return state;
}
