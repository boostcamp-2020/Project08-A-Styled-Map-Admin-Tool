import { useState } from 'react';

export interface ImportModalHookProps {
  importModalToggleHandler: (e: React.MouseEvent) => void;
}

export interface SidebarImportModalHookType {
  text: string;
  onClickClose: (e: React.MouseEvent) => void;
  changeText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickOK: (e: React.MouseEvent) => void;
}

function useSidebarImportModal({
  importModalToggleHandler,
}: ImportModalHookProps): SidebarImportModalHookType {
  const [text, setText] = useState('');

  const onClickClose = (e: React.MouseEvent) => {
    setText('');
    importModalToggleHandler(e);
  };

  const changeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onClickOK = (e: React.MouseEvent) => {
    importModalToggleHandler(e);
  };

  return {
    text,
    onClickClose,
    changeText,
    onClickOK,
  };
}

export default useSidebarImportModal;
