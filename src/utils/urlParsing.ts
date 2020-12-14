import {
  /** JSONURL */
  URLJsonType,
  URLJsonFeatureType,
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
  locationTypeName,
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
      return `${queryString}${key}:${value}:`;
    },
    ''
  );
}

export function jsonToURL(json: URLJsonType): string {
  const url = 'http://localhost:3000/show?=';
  const styleQueryString = `style=${encodeURIComponent(
    jsonToURLGetStyleQueryString(json?.filteredStyle as URLJsonType)
  )}end`;
  const locationQueryString = `location=${encodeURIComponent(
    jsonToURLGetStyleLocationString(json?.mapCoordinate as LocationType)
  )}`;

  return url + locationQueryString + styleQueryString;
}

function urlToJsonGetStyleJson(queryString: string): URLJsonFeatureType | null {
  try {
    const values = queryString?.split('style=')[1]?.split(':');
    const state: URLJsonFeatureType = {};
    type propertiesType = {
      feature: FeatureNameType | '';
      subFeature: string | '';
      element: ElementNameType | '';
      subElement: SubElementNameType | '';
    };
    const properties: propertiesType = {
      feature: '',
      subFeature: '',
      element: '',
      subElement: '',
    };

    values?.forEach((value, index) => {
      const { feature, subFeature, element, subElement } = properties;
      if (value in FeatureNameType) {
        state[value as FeatureNameType] = {};
        properties.feature = value as FeatureNameType;
      } else if (value in SubFeatureNameType && feature) {
        (state[feature] as URLJsonSubFeatureType)[value] = {};
        properties.subFeature = value;
      } else if (value in ElementNameType && feature) {
        (state[feature] as URLJsonSubFeatureType)[subFeature][
          value as ElementNameType
        ] = {};
        properties.element = value as ElementNameType;
      } else if (value in SubElementNameType && feature && element) {
        ((state[feature] as URLJsonSubFeatureType)[subFeature][
          element
        ] as URLJsonSubFeatureType)[value] = {};
        properties.subElement = value as SubElementNameType;
      } else if (value in StyleKeyType && feature && element && subElement) {
        if (element === ElementNameType.labelIcon) {
          (((state[feature] as URLJsonSubFeatureType)[subFeature][
            element
          ] as URLJsonSubFeatureType)[
            value as StyleKeyType
          ] as URLJsonStyleType) = values[index + 1] as URLJsonStyleType;
          return;
        }
        ((((state[feature] as URLJsonSubFeatureType)[subFeature][
          element
        ] as URLJsonSubFeatureType)[subElement] as URLJsonStyleType)[
          value as StyleKeyType
        ] as URLJsonStyleType) = values[index + 1] as URLJsonStyleType;
      }
    });
    return state;
  } catch (error) {
    return null;
  }
}

function urlToJsonGetLocationJson(queryString: string): LocationType {
  try {
    const values = queryString
      ?.split('location=')[1]
      .split('style=')[0]
      ?.split(':');

    const state: LocationType = {};
    for (let i = 0; i < values.length; i += 2) {
      state[values[i] as locationTypeName] = Number(values[i + 1]);
    }
    return state;
  } catch (error) {
    return {};
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
