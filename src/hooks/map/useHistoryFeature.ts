import { useDispatch, useSelector } from 'react-redux';
import { addLog, resetHistory } from '../../store/history/action';
import { HistoryInfoPropsType, HistoryState } from '../../store/common/type';
import { useState, useEffect } from 'react';
import useWholeStyle from '../../hooks/common/useWholeStyle';
import { RootState } from '../../store/index';

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
  const { log } = useSelector<RootState>(
    (state) => state.history
  ) as HistoryState;

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

  useEffect(() => {
    window.onbeforeunload = function setLog(): void {
      if (log !== undefined) {
        localStorage.setItem('log', JSON.stringify(log || []));
      }
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, [log]);

  return {
    isHistoryOpen,
    historyBtnHandler,
    addHistory,
    resetHistoryAndStyle,
  };
}

export default useHistoryFeature;
