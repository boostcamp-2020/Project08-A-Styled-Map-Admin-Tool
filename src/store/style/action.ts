import { ActionPayload, WholeStyleActionPayload } from '../common/type';

export const INIT = 'INIT' as const;
export const SET = 'SET' as const;
export const SET_WHOLE = 'SET_WHOLE' as const;

export interface SetType {
  type: typeof SET;
  payload: ActionPayload;
}

export interface SetWholeType {
  type: typeof SET_WHOLE;
  payload: WholeStyleActionPayload;
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

export const setWholeStyle = (
  wholeStyle: WholeStyleActionPayload
): SetWholeType => ({
  type: SET_WHOLE,
  payload: wholeStyle,
});
