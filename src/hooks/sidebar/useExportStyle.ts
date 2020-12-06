import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import mapboxgl from 'mapbox-gl';
import {
  ElementNameType,
  ElementPropsType,
  FeatureNameType,
  StyleKeyType,
  SubElementNameType,
} from '../../store/common/type';
import { getDefaultStyle } from '../../store/style/properties';

interface StoreDataType {
  [key: string]: FeatureNameType | mapboxgl.Map | undefined;
}

interface UseExportStyleType {
  exportStyle: () => StoreDataType;
}

interface StyleType {
  isChanged?: boolean;
  visibility?: string;
  color?: string;
  weight?: number;
  saturation?: number;
  lightness?: number;
}

interface SubElementType {
  isChanged?: boolean;
  fill?: StyleType;
  stroke?: StyleType;
}

interface SubFeatureType {
  all?: boolean;
}

interface ElementType {
  isChanged?: boolean;
  section?: SubElementType | null;
  labelText?: SubElementType | null;
  labelIcon?: StyleType | null;
}

function compareChange(
  defaultStyle: StyleType,
  newStyle: StyleType
): StyleType {
  const ret = Object.keys(defaultStyle).reduce((accu, key) => {
    if (key === 'isChanged') {
      return accu;
    }

    if (defaultStyle[key as StyleKeyType] === newStyle[key as StyleKeyType]) {
      return accu;
    }

    return { ...accu, [key]: newStyle[key as StyleKeyType] };
  }, {});

  return ret;
}

function filterSubElement(
  currentLocation: ElementPropsType,
  subElement: SubElementType
): SubElementType {
  if (subElement.isChanged) {
    return compareChange(getDefaultStyle(currentLocation), subElement);
  }

  const ret = Object.entries(subElement).reduce((accu, [key, styleKey]) => {
    if (!styleKey.isChanged) {
      return accu;
    }
    console.log({ ...currentLocation, subElement: key });
    console.log(
      'default',
      getDefaultStyle({
        ...currentLocation,
        subElement: key as SubElementNameType,
      })
    );

    const { isChanged, ...changedStyleKey } = styleKey;
    return isChanged
      ? {
          ...accu,
          [key]: compareChange(
            getDefaultStyle({
              ...currentLocation,
              subElement: key as SubElementNameType,
            }),
            styleKey
          ),
        }
      : accu;
  }, {});
  return ret;
}

function filterElement(
  currentLocation: ElementPropsType,
  element: ElementType
): ElementType {
  if (!element.isChanged) {
    return {};
  }

  const { isChanged, ...changedElement } = element;

  const ret = Object.entries(changedElement).reduce(
    (accu, [key, subElement]) => {
      if (subElement === null) {
        return accu;
      }
      const filteredValue = filterSubElement(
        { ...currentLocation, element: key as ElementNameType },
        subElement
      );

      return Object.keys(filteredValue).length === 0
        ? accu
        : { ...accu, [key]: filteredValue };
    },
    {}
  );
  return ret;
}

function filterSubFeature(
  currentLocation: ElementPropsType,
  subFeature: SubFeatureType
) {
  const ret = Object.entries(subFeature).reduce((accu, [key, element]) => {
    if (key === 'all') {
      return accu;
    }
    const filteredValue = filterElement(
      { ...currentLocation, subFeature: key },
      element as ElementType
    );

    return Object.keys(filteredValue).length === 0
      ? accu
      : { ...accu, [key]: filteredValue };
  }, {});

  return ret;
}

function filterStyle(style: StoreDataType): StoreDataType {
  const ret = Object.entries(style).reduce((accu, [key, subFeature]) => {
    const currentLocation: ElementPropsType = {
      feature: key as FeatureNameType,
      subFeature: '',
      element: 'section' as ElementNameType,
      subElement: undefined,
    };
    const filteredValue = filterSubFeature(
      currentLocation,
      subFeature as SubFeatureType
    );
    return Object.keys(filteredValue).length === 0
      ? accu
      : { ...accu, [key]: filteredValue };
  }, {});

  return ret;
}

function useExportStyle(): UseExportStyleType {
  const data: StoreDataType = useSelector<RootState>(
    (state) => state
  ) as StoreDataType;

  const exportStyle = (): StoreDataType => {
    if ('map' in data || 'sidebar' in data) {
      const { map, sidebar, ...style } = data;
      const filteredStyle = filterStyle(style);
      return filteredStyle;
    }

    return {};
  };

  return { exportStyle };
}

export default useExportStyle;
