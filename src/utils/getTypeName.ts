import {
  ElementNameType,
  SubElementNameType,
  StyleKeyType,
  objType,
} from '../store/common/type';
import featureTypeData from './rendering-data/featureTypeData';

const featureName = featureTypeData.reduce(
  (pre, cur) => {
    const name = pre;
    name.feature[cur.typeKey] = cur.typeName;
    name.subFeature[cur.typeKey] = { all: '전체' };
    cur.subFeatures.forEach((sub) => {
      name.subFeature[cur.typeKey][sub.key] = sub.name;
    });
    return name;
  },
  { feature: {}, subFeature: {} } as objType
);

const elementName = {
  element: {
    [ElementNameType.section]: '구역',
    [ElementNameType.labelText]: '라벨 > 텍스트',
    [ElementNameType.labelIcon]: '라벨 > 아이콘',
  },
  subElement: {
    [SubElementNameType.fill]: '채우기',
    [SubElementNameType.stroke]: '테두리',
  },
  style: {
    [StyleKeyType.visibility]: '가시성',
    [StyleKeyType.color]: '색상',
    [StyleKeyType.weight]: '굵기',
    [StyleKeyType.saturation]: '채도',
    [StyleKeyType.lightness]: '밝기',
    [StyleKeyType.isChanged]: '',
  },
};

export { featureName, elementName };
