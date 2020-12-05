import { useState } from 'react';
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

function useModalStatus({
  importModalToggleHandler,
}: useModalStatusProps): useModalStatusType {
  const [inputStatus, setInputStatus] = useState(true);
  const { changeStyle } = useWholeStyle();

  const onClickClose = () => {
    importModalToggleHandler();
  };

  const onClickOK = (inputText: string) => {
    try {
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
