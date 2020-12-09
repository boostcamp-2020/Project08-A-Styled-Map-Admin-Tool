import { FeatureNameType } from '../../store/common/type';

export interface FeaturesType {
  key: string;
  name: string;
}
export interface DataType {
  typeKey: FeatureNameType;
  typeName: string;
  subFeatures: FeaturesType[];
}

const data: DataType[] = [
  {
    typeKey: FeatureNameType.poi,
    typeName: 'POI',
    subFeatures: [
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
    typeKey: FeatureNameType.road,
    typeName: '도로',
    subFeatures: [
      { key: 'arterial', name: '주요도로' },
      { key: 'local', name: '일반도로' },
      { key: 'sidewalk', name: '인도' },
    ],
  },
  {
    typeKey: FeatureNameType.administrative,
    typeName: '행정구역',
    subFeatures: [
      { key: 'country', name: '국가' },
      { key: 'state', name: '도/주' },
      { key: 'locality', name: '그외' },
    ],
  },
  {
    typeKey: FeatureNameType.landscape,
    typeName: '경관',
    subFeatures: [
      { key: 'humanmade', name: '인공물' },
      { key: 'building', name: '건물' },
      { key: 'natural', name: '자연물' },
      { key: 'landcover', name: '평지' },
      { key: 'mountain', name: '산지' },
    ],
  },
  {
    typeKey: FeatureNameType.transit,
    typeName: '교통',
    subFeatures: [
      { key: 'airport', name: '공항' },
      { key: 'bus', name: '버스' },
      { key: 'rail', name: '철도' },
      { key: 'subway', name: '지하철' },
    ],
  },
  { typeKey: FeatureNameType.water, typeName: '물', subFeatures: [] },
  { typeKey: FeatureNameType.marker, typeName: '마크', subFeatures: [] },
];

export default data;
