import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { initHistory, toggleHistory, addLog } from '../../store/history/action';
import {
  HistoryPropsType,
  HistoryInfoPropsType,
} from '../../store/common/type';

export interface useHistoryFeatureType {
  initIsOpenHistory: () => void;
  clickHistoryBtnHandler: () => void;
  addHistory: (info: HistoryInfoPropsType) => void;
}

function useHistoryFeature(): useHistoryFeatureType {
  const dispatch = useDispatch();
  const historyStates = useSelector<RootState>(
    (state) => state.history
  ) as HistoryPropsType;
  const { isHistoryOpen } = historyStates;

  const clickHistoryBtnHandler = () => {
    dispatch(toggleHistory({ isHistoryOpen, log: [] }));
  };

  const initIsOpenHistory = () => {
    dispatch(initHistory({ isHistoryOpen }));
  };

  const addHistory = (info: HistoryInfoPropsType) => {
    dispatch(addLog(info));
  };

  return {
    initIsOpenHistory,
    clickHistoryBtnHandler,
    addHistory,
  };
}

export default useHistoryFeature;
