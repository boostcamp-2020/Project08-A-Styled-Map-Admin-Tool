import mapboxgl from 'mapbox-gl';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  HistoryState,
  SubElementNameType,
  StyleType,
  SubElementType,
  WholeStyleActionPayload,
} from '../../store/common/type';
import { getDefaultStyle } from '../../store/style/properties';
import { setCurrentIndex } from '../../store/history/action';
import { setStyle } from '../../store/style/action';
import * as mapStyling from '../../utils/map-styling';
import useWholeStyle from '../common/useWholeStyle';

interface UseUndoRedoType {
  undoHandler: () => void;
  redoHandler: () => void;
}

interface ReduxStateType extends HistoryState {
  map: mapboxgl.Map;
}

function useUndoRedo(): UseUndoRedoType {
  const dispatch = useDispatch();
  const { changeStyle } = useWholeStyle();
  const { map, log, currentIdx } = useSelector<RootState>((state) => ({
    map: state.map.map,
    log: state.history.log,
    currentIdx: state.history.currentIdx,
  })) as ReduxStateType;
  const initColor = 'init' as const;

  const undoHandler = () => {
    if (!map || !log || currentIdx === null || currentIdx < 0) return;
    const undoIdx = currentIdx - 1;
    const { feature, subFeature, element, subElement, style, changedKey } = log[
      currentIdx
    ];
    if (!feature || !subFeature || !element) return;

    dispatch(setCurrentIndex(undoIdx));
    /** 전체를 다시 한번 그리는 경우 */
    const isChangeWholeStyle =
      undoIdx >= 0 &&
      log[undoIdx].subFeature === 'all' &&
      log[undoIdx].changedValue === initColor;
    if (isChangeWholeStyle) {
      changeStyle(log[undoIdx].wholeStyle as WholeStyleActionPayload);
      return;
    }

    let beforeStyle;
    if (currentIdx === 0) {
      beforeStyle = subElement
        ? getDefaultStyle({
            feature,
            subFeature,
            element,
            subElement,
          })
        : getDefaultStyle({ feature, subFeature, element });
    } else {
      const { wholeStyle } = log[undoIdx];
      beforeStyle =
        subElement && wholeStyle
          ? (wholeStyle[feature][subFeature][element] as SubElementType)[
              subElement
            ]
          : wholeStyle[feature][subFeature][element];
    }

    /** 변경된 사항에만 그리는 경우 */
    mapStyling[feature]({
      map,
      subFeature,
      key: changedKey,
      element,
      subElement,
      style: {
        ...style,
        [changedKey]: (beforeStyle as StyleType)[changedKey],
      },
    });

    dispatch(
      setStyle({
        feature,
        subFeature,
        element,
        subElement: subElement as SubElementNameType,
        style: {
          ...style,
          [changedKey]: (beforeStyle as StyleType)[changedKey],
        },
      })
    );
  };

  const redoHandler = () => {
    if (!log || (log && currentIdx === log.length - 1)) return;
    const redoIdx = (currentIdx as number) + 1;

    const {
      feature,
      subFeature,
      element,
      subElement,
      style,
      changedKey,
      changedValue,
      wholeStyle,
    } = log[redoIdx as number];
    if (!feature || !subFeature || !element) return;

    dispatch(setCurrentIndex(redoIdx));

    /** 전체를 다시 한번 그리는 경우 */
    const isChangeWholeStyle =
      subFeature === 'all' && changedValue === initColor;
    if (isChangeWholeStyle) {
      changeStyle(wholeStyle as WholeStyleActionPayload);
      return;
    }

    /** 변경된 사항에만 그리는 경우 */
    mapStyling[feature]({
      map,
      subFeature,
      key: changedKey,
      element,
      subElement,
      style,
    });

    dispatch(
      setStyle({
        feature,
        subFeature,
        element,
        subElement: subElement as SubElementNameType,
        style,
      })
    );
  };

  return { undoHandler, redoHandler };
}
export default useUndoRedo;
