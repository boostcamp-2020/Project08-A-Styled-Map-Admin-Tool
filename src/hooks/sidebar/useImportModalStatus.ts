import { useState } from 'react';
import useWholeStyle from '../common/useWholeStyle';

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
