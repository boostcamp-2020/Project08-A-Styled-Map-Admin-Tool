import mapboxgl from 'mapbox-gl';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  HistoryPropsType,
  SubElementNameType,
  StyleType,
  SubElementType,
} from '../../store/common/type';
import { getDefaultStyle } from '../../store/style/properties';
import { setCurrentIndex } from '../../store/history/action';
import { setStyle } from '../../store/style/action';
import * as mapStyling from '../../utils/map-styling';

interface UseUndoRedoType {
  undoHandler: () => void;
  redoHandler: () => void;
}

function useUndoRedo(): UseUndoRedoType {
  const dispatch = useDispatch();
  const map = useSelector<RootState>((state) => state.map.map) as mapboxgl.Map;
  const { log, currentIdx } = useSelector<RootState>(
    (state) => state.history
  ) as HistoryPropsType;

  const undoHandler = () => {
    if (!log || currentIdx === null || currentIdx < 0) return;
    const undoIdx = currentIdx - 1;
    const { feature, subFeature, element, subElement, style, changedKey } = log[
      currentIdx
    ];
    if (!feature || !subFeature || !element) return;

    dispatch(setCurrentIndex(undoIdx));
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

    const { feature, subFeature, element, subElement, style, changedKey } = log[
      redoIdx as number
    ];
    if (!feature || !subFeature || !element) return;

    dispatch(setCurrentIndex(redoIdx));

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
