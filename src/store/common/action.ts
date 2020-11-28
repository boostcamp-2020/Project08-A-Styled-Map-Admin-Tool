import { ActionPayload } from './type';

export const INIT = 'INIT' as const;
export const SET = 'SET' as const;
export const SET_SECTION = 'SET_SECTION' as const;
export const SET_LABEL_TEXT = 'SET_LABEL_TEXT' as const;
export const SET_LABEL_ICON = 'SET_LABEL_ICON' as const;

export interface SetType {
  type: typeof SET;
  payload: ActionPayload;
}

export const init = (): { type: typeof INIT } => ({
  type: INIT,
});

export const setStyle = ({
  feature,
  element,
  subElement,
  style,
}: ActionPayload): SetType => ({
  type: SET,
  payload: { feature, element, subElement, style },
});

export type ActionType = ReturnType<typeof init> | ReturnType<typeof setStyle>;
