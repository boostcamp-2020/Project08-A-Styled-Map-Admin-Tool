import { useState, useEffect } from 'react';
import useWholeStyle from '../common/useWholeStyle';
import validateStyle from '../../utils/validateStyle';
import { ReplaceType } from '../../store/common/type';

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
  const { flag: isImporting, changeStyle } = useWholeStyle();

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

  useEffect(() => {
    if (!isImporting) return;
    importModalToggleHandler();
  }, [isImporting]);

  const onClickClose = () => {
    if (!isImporting) importModalToggleHandler();
  };

  const onClickOK = (inputText: string) => {
    try {
      if (!inputStatus) return;
      const input = JSON.parse(inputText);
      if (!validateStyle(input)) throw new Error('InvalidStyle');
      changeStyle(input, { changedKey: ReplaceType.import });
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
