import mapboxgl from 'mapbox-gl';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  HistoryState,
  HistorySetLogType,
  ReplaceType,
  SubElementNameType,
  StyleType,
  SubElementType,
  StyleStoreType,
  ColorSubStyleType,
  StyleKeyType,
} from '../../store/common/type';
import { getDefaultStyle } from '../../store/style/properties';
import { setCurrentIndex } from '../../store/history/action';
import { setStyle } from '../../store/style/action';
import { initDepthTheme } from '../../store/depth-theme/action';
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
  const { changeStyle, replaceStyle } = useWholeStyle();
  const { map, log, currentIdx } = useSelector<RootState>((state) => ({
    map: state.map.map,
    log: state.history.log,
    currentIdx: state.history.currentIdx,
  })) as ReduxStateType;

  const undoHandler = () => {
    if (!map || !log || currentIdx === null || currentIdx < 0) return;
    const undoIdx = currentIdx - 1;
    dispatch(setCurrentIndex(undoIdx));

    /** 전체를 다시 한번 그리는 경우 */
    if (log[currentIdx].changedKey in ReplaceType) {
      dispatch(initDepthTheme());
      if (currentIdx === 0) changeStyle({});
      else replaceStyle(log[undoIdx].wholeStyle as StyleStoreType);
      return;
    }

    const { feature, subFeature, element, subElement, changedKey } = log[
      currentIdx
    ] as HistorySetLogType;

    if (!feature || !subFeature || !element) return;

    const key =
      changedKey === ColorSubStyleType.saturation ||
      changedKey === ColorSubStyleType.lightness
        ? StyleKeyType.color
        : changedKey;

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

    /** 변경된 사항만 그리는 경우 */
    mapStyling[feature]({
      map,
      subFeature,
      key,
      element,
      subElement: subElement as SubElementNameType,
      style: beforeStyle as StyleType,
    });
    dispatch(
      setStyle({
        feature,
        subFeature,
        element,
        subElement: subElement as SubElementNameType,
        style: beforeStyle as StyleType,
      })
    );
  };

  const redoHandler = () => {
    if (!log || currentIdx === null || currentIdx === log.length - 1) return;
    const redoIdx = (currentIdx as number) + 1;
    dispatch(setCurrentIndex(redoIdx));

    /** 전체를 다시 한번 그리는 경우 */
    if (log[redoIdx].changedKey in ReplaceType) {
      dispatch(initDepthTheme());
      replaceStyle(log[redoIdx].wholeStyle as StyleStoreType);
      return;
    }

    const { feature, subFeature, element, subElement, style, changedKey } = log[
      redoIdx as number
    ] as HistorySetLogType;
    if (!feature || !subFeature || !element) return;

    const key =
      changedKey === ColorSubStyleType.saturation ||
      changedKey === ColorSubStyleType.lightness
        ? StyleKeyType.color
        : changedKey;

    /** 변경된 사항에만 그리는 경우 */
    mapStyling[feature]({
      map,
      subFeature,
      key,
      element,
      subElement: subElement as SubElementNameType,
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
