import React, { useState, ChangeEvent } from 'react';

type InputType = HTMLInputElement | HTMLTextAreaElement;
export interface InputTextHookType {
  inputText: string;
  onInputChange: (e: ChangeEvent<InputType>) => void;
}

function useInputText(): InputTextHookType {
  const [inputText, setInputText] = useState<string>('');
  const onInputChange = (e: React.ChangeEvent<InputType>) => {
    const newInputText = e.target.value;
    setInputText(newInputText);
  };

  return {
    inputText,
    onInputChange,
  };
}

export default useInputText;
