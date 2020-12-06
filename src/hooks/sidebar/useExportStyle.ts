import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import mapboxgl from 'mapbox-gl';
import { FeatureNameType } from '../../store/common/type';

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

function filterStyleKey(styleKey: StyleType) {
  return styleKey;
}

function filterSubElement(subElement: SubElementType): SubElementType {
  if (subElement === null) {
    return {};
  }

  const { isChanged, ...changedSubElement } = subElement;

  const ret = Object.entries(changedSubElement).reduce(
    (accu, [key, styleKey]) => {
      if (!styleKey.isChanged) {
        return accu;
      }

      const { isChange, ...changedStyleKey } = styleKey;
      return { ...accu, [key]: changedStyleKey };
    },
    {}
  );

  return ret;
}

function filterElement(element: ElementType): ElementType {
  if (element === null || !element.isChanged) {
    return {};
  }

  const { isChanged, ...changedElement } = element;

  const ret = Object.entries(changedElement).reduce(
    (accu, [key, subElement]) => {
      const filteredValue = filterSubElement(subElement);

      return Object.keys(filteredValue).length === 0
        ? accu
        : { ...accu, [key]: subElement };
    },
    {}
  );

  return ret;
}

function filterSubFeature(subFeature: SubFeatureType) {
  const ret = Object.entries(subFeature).reduce((accu, [key, element]) => {
    if (key === 'all') {
      return accu;
    }
    const filteredValue = filterElement(element as ElementType);

    return Object.keys(filteredValue).length === 0
      ? accu
      : { ...accu, [key]: element };
  }, {});

  return ret;
}

function filterStyle(style: StoreDataType): StoreDataType {
  const ret = Object.entries(style).reduce((accu, [key, subFeature]) => {
    const filteredValue = filterSubFeature(subFeature as SubFeatureType);
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
    if ('map' in data) {
      const { map, sidebar, ...style } = data;
      const filteredStyle = filterStyle(style);
      return filteredStyle;
    }

    return {};
  };

  return { exportStyle };
}

export default useExportStyle;
