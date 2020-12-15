import {
  ElementNameType,
  SubElementNameType,
  StyleKeyType,
  ColorSubStyleType,
  ReplaceType,
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
    [ColorSubStyleType.saturation]: '채도',
    [ColorSubStyleType.lightness]: '밝기',
    [StyleKeyType.isChanged]: '',
  },
};

const replaceName = {
  [ReplaceType.init]: '초기화',
  [ReplaceType.import]: '가져오기',
  [ReplaceType.theme]: '테마',
  [ReplaceType.depth]: '표기 단계 조절',
};

const depthName = ['하', '중', '상'];

export { featureName, elementName, replaceName, depthName };
