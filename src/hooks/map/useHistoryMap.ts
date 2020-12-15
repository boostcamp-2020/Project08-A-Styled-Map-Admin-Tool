import { useSelector } from 'react-redux';
import { HistoryState } from '../../store/common/type';
import { useState, useEffect } from 'react';
import { RootState } from '../../store/index';

export interface useHistoryMapType {
  isHistoryOpen: boolean;
  historyBtnHandler: () => void;
}

function useHistoryMap(): useHistoryMapType {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { log } = useSelector<RootState>(
    (state) => state.history
  ) as HistoryState;

  const historyBtnHandler = () => {
    setIsHistoryOpen(!isHistoryOpen);
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
  };
}

export default useHistoryMap;
