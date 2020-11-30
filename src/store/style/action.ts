import { ActionPayload } from '../common/type';

export const INIT = 'INIT' as const;
export const SET = 'SET' as const;

export interface SetType {
  type: typeof SET;
  payload: ActionPayload;
}

export const init = (): { type: typeof INIT } => ({
  type: INIT,
});

export const setStyle = ({
  feature,
  subFeature,
  element,
  subElement,
  style,
}: ActionPayload): SetType => ({
  type: SET,
  payload: { feature, subFeature, element, subElement, style },
});
