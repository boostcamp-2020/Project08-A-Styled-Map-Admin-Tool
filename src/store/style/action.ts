import {
  ActionPayload,
  WholeStyleActionPayload,
  StyleStoreType,
} from '../common/type';

export const INIT = 'INIT' as const;
export const SET = 'SET' as const;
export const SET_WHOLE = 'SET_WHOLE' as const;
export const REPLACE_WHOLE = 'REPLACE_WHOLE' as const;

export interface SetType {
  type: typeof SET;
  payload: ActionPayload;
}

export interface SetWholeType {
  type: typeof SET_WHOLE;
  payload: WholeStyleActionPayload;
}

export interface ReplaceWholeType {
  type: typeof REPLACE_WHOLE;
  payload: StyleStoreType;
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

export const replaceWholeStyle = (
  wholeStyle: StyleStoreType
): ReplaceWholeType => ({
  type: REPLACE_WHOLE,
  payload: wholeStyle,
});
