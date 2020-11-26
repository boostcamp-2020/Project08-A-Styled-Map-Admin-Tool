import { LabelType, CommonType } from './properties';

export interface FeatureState {
  [name: string]: {
    isChanged: boolean;
    section: CommonType;
    label: LabelType;
  };
}
