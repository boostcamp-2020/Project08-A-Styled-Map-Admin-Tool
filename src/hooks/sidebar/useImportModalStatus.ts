import { useState, useEffect } from 'react';
import useWholeStyle from '../common/useWholeStyle';
import validateStyle from '../../utils/validateStyle';

export interface useModalStatusProps {
  importModalToggleHandler: () => void;
}

export interface useModalStatusType {
  inputStatus: boolean;
  onClickClose: () => void;
  onClickOK: (inputText: string) => void;
}

const Delay = 2000;

function useModalStatus({
  importModalToggleHandler,
}: useModalStatusProps): useModalStatusType {
  const [inputStatus, setInputStatus] = useState(true);
  const { changeStyle } = useWholeStyle();

  useEffect(() => {
    if (inputStatus) return;
    const timer = setTimeout(() => {
      setInputStatus(true);
    }, Delay);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timer);
    };
  }, [inputStatus]);

  const onClickClose = () => {
    importModalToggleHandler();
  };

  const onClickOK = (inputText: string) => {
    try {
      if (!inputStatus) return;
      const input = JSON.parse(inputText);
      if (!validateStyle(input)) throw new Error('InvalidStyle');
      changeStyle(input);
      importModalToggleHandler();
    } catch {
      setInputStatus(false);
    }
  };

  return {
    inputStatus,
    onClickClose,
    onClickOK,
  };
}

export default useModalStatus;
