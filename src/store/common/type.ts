import { LabelType, CommonType } from './commonProperties';

export interface FeatureState {
  [name: string]: {
    isChanged: boolean;
    section: CommonType;
    label: LabelType;
  };
}
