import React, { useState } from 'react';
import ImportModal from './ImportModalPresenter';

interface ImportModalContainerProps {
  importModalToggleHandler: () => void;
}

function ImportModalContainer({
  importModalToggleHandler,
}: ImportModalContainerProps): React.ReactElement {
  const [text, setText] = useState('');

  const onClickClose = () => {
    setText('');
    importModalToggleHandler();
  };

  const changeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onClickOK = (e: React.MouseEvent) => {
    importModalToggleHandler();
  };

  return (
    <ImportModal
      onClickClose={onClickClose}
      text={text}
      changeText={changeText}
      onClickOK={onClickOK}
    />
  );
}

export default ImportModalContainer;
