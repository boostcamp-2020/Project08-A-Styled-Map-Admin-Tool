import { StyleType } from './commonProperties';

export const INIT = 'INIT' as const;
export const SET_SECTION = 'SET_SECTION' as const;
export const SET_LABEL_TEXT = 'SET_LABEL_TEXT' as const;
export const SET_LABEL_ICON = 'SET_LABEL_ICON' as const;

export type ElementType = 'fill' | 'stroke';
export interface SetType {
  type: typeof SET_SECTION | typeof SET_LABEL_ICON | typeof SET_LABEL_TEXT;
  payload: {
    feature: string;
    element?: ElementType;
    style: StyleType;
  };
}

export const init = (): { type: typeof INIT } => ({
  type: INIT,
});

export const setSection = (
  feature: string,
  element: ElementType,
  style: StyleType
): SetType => ({
  type: SET_SECTION,
  payload: { feature, style, element },
});

export const setLabelText = (
  feature: string,
  element: ElementType,
  style: StyleType
): SetType => ({
  type: SET_LABEL_TEXT,
  payload: { feature, style, element },
});

export const setLabelIcon = (feature: string, style: StyleType): SetType => ({
  type: SET_LABEL_ICON,
  payload: { feature, style },
});

export type ActionType =
  | ReturnType<typeof init>
  | ReturnType<typeof setSection>
  | ReturnType<typeof setLabelText>
  | ReturnType<typeof setLabelIcon>;
