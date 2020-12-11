import {
  FeatureNameType,
  ActionPayload,
  WholeStyleActionPayload,
  StyleStoreType,
  ElementNameType,
  SubElementNameType,
} from '../common/type';

export const INIT = 'INIT' as const;
export const SET = 'SET' as const;
export const SET_WHOLE = 'SET_WHOLE' as const;
export const REPLACE_WHOLE = 'REPLACE_WHOLE' as const;
export const INIT_COLORS = 'INIT_COLORS' as const;

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

export interface InitColorsType {
  type: typeof INIT_COLORS;
  payload: {
    feature: FeatureNameType;
    element: ElementNameType;
    subElement: SubElementNameType;
  };
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

export const initColors = (
  feature: FeatureNameType,
  element: ElementNameType,
  subElement: SubElementNameType
): InitColorsType => ({
  type: INIT_COLORS,
  payload: { feature, subElement, element },
});
