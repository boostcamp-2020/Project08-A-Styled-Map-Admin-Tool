import { useDispatch } from 'react-redux';
import { addLog } from '../../store/history/action';
import { HistoryInfoPropsType } from '../../store/common/type';
import { useState } from 'react';

export interface useHistoryFeatureType {
  isHistoryOpen: boolean;
  historyBtnHandler: () => void;
  addHistory: (info: HistoryInfoPropsType) => void;
}

function useHistoryFeature(): useHistoryFeatureType {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const dispatch = useDispatch();

  const historyBtnHandler = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const addHistory = (info: HistoryInfoPropsType) => {
    dispatch(addLog(info));
  };

  return {
    isHistoryOpen,
    historyBtnHandler,
    addHistory,
  };
}

export default useHistoryFeature;
