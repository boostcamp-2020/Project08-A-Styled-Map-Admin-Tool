import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { initHistory, toggleHistory } from '../../store/history/action';
import { HistoryPropsType } from '../../store/common/type';

export interface useHistoryFeatureType {
  initIsOpenHistory: () => void;
  clickHistoryBtnHandler: () => void;
}

function useHistoryFeature(): useHistoryFeatureType {
  const dispatch = useDispatch();
  const historyStates = useSelector<RootState>(
    (state) => state.history
  ) as HistoryPropsType;
  const { isHistoryOpen } = historyStates;

  const clickHistoryBtnHandler = () => {
    dispatch(toggleHistory({ isHistoryOpen }));
  };

  const initIsOpenHistory = () => {
    dispatch(initHistory({ isHistoryOpen }));
  };

  return {
    initIsOpenHistory,
    clickHistoryBtnHandler,
  };
}

export default useHistoryFeature;
