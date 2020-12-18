// Dependencies
import { useState, useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

// Type
import { HistoryState } from '../../store/common/type';

export interface useHistoryMapType {
  isHistoryOpen: boolean;
  historyBtnHandler: () => void;
}

const LOCALSTORAGE_MAX_LOG_COUNT = 50;

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
        const fiftyLog =
          log.length <= LOCALSTORAGE_MAX_LOG_COUNT
            ? log
            : log.splice(log.length - LOCALSTORAGE_MAX_LOG_COUNT);
        localStorage.setItem('log', JSON.stringify(fiftyLog));
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
