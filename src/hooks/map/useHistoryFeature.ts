import { useDispatch } from 'react-redux';
import { addLog, resetHistory } from '../../store/history/action';
import { HistoryInfoPropsType } from '../../store/common/type';
import { useState } from 'react';
import useWholeStyle from '../../hooks/common/useWholeStyle';

export interface useHistoryFeatureType {
  isHistoryOpen: boolean;
  historyBtnHandler: () => void;
  addHistory: (info: HistoryInfoPropsType) => void;
  resetHistoryAndStyle: () => void;
}

function useHistoryFeature(): useHistoryFeatureType {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { changeStyle } = useWholeStyle();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const dispatch = useDispatch();

  const historyBtnHandler = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const addHistory = (info: HistoryInfoPropsType) => {
    dispatch(addLog(info));
  };

  const resetHistoryAndStyle = () => {
    dispatch(resetHistory());
    changeStyle({});
  };

  return {
    isHistoryOpen,
    historyBtnHandler,
    addHistory,
    resetHistoryAndStyle,
  };
}

export default useHistoryFeature;
