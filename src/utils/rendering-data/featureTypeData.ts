export type FeatureNameType = 'poi' | 'road';

export interface FeaturesType {
  key: string;
  name: string;
}
export interface DataType {
  typeKey: FeatureNameType;
  typeName: string;
  features: FeaturesType[];
}

const data: DataType[] = [
  {
    typeKey: 'poi',
    typeName: 'POI',
    features: [
      { key: 'landmark', name: '랜드마크' },
      { key: 'business', name: '상업시설' },
      { key: 'government', name: '공공시설' },
      { key: 'medical', name: '의료' },
      { key: 'park', name: '공원' },
      { key: 'worship', name: '종교시설' },
      { key: 'school', name: '교육기관' },
      { key: 'sports', name: '체육시설' },
      { key: 'etc', name: '기타시설' },
    ],
  },
  {
    typeKey: 'road',
    typeName: '도로',
    features: [
      { key: 'highway', name: '고속도로' },
      { key: 'arterial', name: '주요도로' },
      { key: 'local', name: '일반도로' },
      { key: 'sidewalk', name: '인도' },
      { key: 'bicycle-road', name: '자전거도로' },
    ],
  },
  // {
  //   typeKey: 'landscape',
  //   typeName: '경관',
  //   features: [
  //     { key: 'human-made', name: '인공물' },
  //     { key: 'building', name: '건물' },
  //     { key: 'natural', name: '자연물' },
  //     { key: 'landcover', name: '평지' },
  //     { key: 'mountain', name: '산지' },
  //   ],
  // },
  // {
  //   typeKey: 'administrative',
  //   typeName: '행정구역',
  //   features: [
  //     { key: 'countryLabel', name: '국가' },
  //     { key: 'stateLabel', name: '도/주' },
  //     { key: 'localityLabel', name: '시' },
  //     { key: 'neighborLabel', name: '그외' },
  //   ],
  // },
  // {
  //   typeKey: 'transit',
  //   typeName: '교통',
  //   features: [
  //     { key: 'airport', name: '공항' },
  //     { key: 'bus', name: '버스' },
  //     { key: 'rail', name: '철도' },
  //     { key: 'subway', name: '지하철' },
  //   ],
  // },
  // { typeKey: 'water', typeName: '물', features: [] },
  // { typeKey: 'mark', typeName: '마크', features: [] },
];

export default data;
