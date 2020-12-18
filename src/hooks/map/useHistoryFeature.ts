// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { resetHistory } from '../../store/history/action';
import { initDepthTheme } from '../../store/depth-theme/action';

// Type
import { HistoryState, HistoryInfoPropsType } from '../../store/common/type';

// Hook
import useWholeStyle from '../common/useWholeStyle';

export interface useHistoryFeatureType {
  log?: HistoryInfoPropsType[];
  currentIdx: number | null;
  resetHistoryAndStyle: () => void;
}

function useHistoryFeature(): useHistoryFeatureType {
  const { log, currentIdx } = useSelector<RootState>(
    (state) => state.history
  ) as HistoryState;
  const { changeStyle } = useWholeStyle();

  const dispatch = useDispatch();

  const resetHistoryAndStyle = () => {
    dispatch(resetHistory());
    dispatch(initDepthTheme());
    changeStyle({});
  };

  return { log, currentIdx, resetHistoryAndStyle };
}

export default useHistoryFeature;
