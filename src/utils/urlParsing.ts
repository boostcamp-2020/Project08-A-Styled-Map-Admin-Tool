import { ExportType, StoreDataType } from '../hooks/sidebar/useExportStyle';
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
import { MarkerType } from '../store/marker/action';

enum QueryParameterTypes {
  location = 'location',
  markers = 'markers',
  style = 'style',
}

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

function jsonToURLGetMarkersString(markers: MarkerType[]): string {
  const markersArrayToString = markers
    .map(({ lng, lat, text }) => `${lng}:${lat}:${text}`)
    .join('-');
  return markersArrayToString;
}

function isNotEmptyObject(object?: StoreDataType | MarkerType[]): boolean {
  return object !== undefined && Object.keys(object).length > 0;
}

export function jsonToURL({
  filteredStyle,
  mapCoordinate,
  markers,
}: ExportType): string {
  const url = 'http://map-styler.kro.kr/show?';
  const styleQueryString = isNotEmptyObject(filteredStyle)
    ? `style=${encodeURIComponent(
        jsonToURLGetStyleQueryString(filteredStyle as URLJsonType)
      )}&`
    : '';
  const locationQueryString = `location=${encodeURIComponent(
    jsonToURLGetStyleLocationString(mapCoordinate as LocationType)
  )}&`;
  const markerQueryString = isNotEmptyObject(markers)
    ? `markers=${encodeURIComponent(
        jsonToURLGetMarkersString(markers as MarkerType[])
      )}`
    : ``;

  return url + locationQueryString + styleQueryString + markerQueryString;
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

// "126.97480611135364:37.56420487114832::-126.9780986231574:37.565479731300016::"
function urlToJsonGetMarkerJson(markers: string) {
  const markerArray = markers
    .split('-')
    .map((marker) => marker.split(':'))
    .map(([lng, lat, text]) => ({
      lng: +lng,
      lat: +lat,
      text,
    }));

  return markerArray;
}

function parseQueryString(query: string) {
  const params = query.slice(1).split('&');
  const findParam = (key: QueryParameterTypes) =>
    params.find((param) => param.startsWith(key))?.replace(`${key}=`, '');

  const location = findParam(QueryParameterTypes.location) ?? '';
  const markers = findParam(QueryParameterTypes.markers) ?? '';
  const style = findParam(QueryParameterTypes.style) ?? '';

  return { location, markers, style };
}

export function urlToJson(): URLJsonType {
  const queryString = decodeURIComponent(window.location.search);
  const { location, markers, style } = parseQueryString(queryString);
  const state = {
    filteredStyle: urlToJsonGetStyleJson(queryString) as URLJsonSubFeatureType,
    mapCoordinate: urlToJsonGetLocationJson(queryString),
    markers: urlToJsonGetMarkerJson(markers),
  };

  return state;
}
