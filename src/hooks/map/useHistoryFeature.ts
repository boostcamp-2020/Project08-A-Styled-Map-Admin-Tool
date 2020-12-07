import { useDispatch } from 'react-redux';
import { initHistory, addLog } from '../../store/history/action';
import { HistoryInfoPropsType } from '../../store/common/type';
import { useState } from 'react';

export interface useHistoryFeatureType {
  isHistoryOpen: boolean;
  initHistoryStatus: () => void;
  historyBtnHandler: () => void;
  addHistory: (info: HistoryInfoPropsType) => void;
}

function useHistoryFeature(): useHistoryFeatureType {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const dispatch = useDispatch();

  const historyBtnHandler = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const initHistoryStatus = () => {
    dispatch(initHistory({ isHistoryOpen }));
  };

  const addHistory = (info: HistoryInfoPropsType) => {
    dispatch(addLog(info));
  };

  return {
    isHistoryOpen,
    initHistoryStatus,
    historyBtnHandler,
    addHistory,
  };
}

export default useHistoryFeature;
