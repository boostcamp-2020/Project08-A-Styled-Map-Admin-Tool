import { useState, ChangeEvent } from 'react';

export interface InputTextHookType {
  inputText: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function useInputText(): InputTextHookType {
  const [inputText, setInputText] = useState<string>('');
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newInputText = e.target.value;
    setInputText(newInputText);
  };

  return {
    inputText,
    onInputChange,
  };
}

export default useInputText;
