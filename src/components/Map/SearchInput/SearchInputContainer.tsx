import React, { ReactElement, useState, ChangeEvent } from 'react';
import SearchInputPresenter from './SearchInputPresenter';

function SearchInputContainer(): ReactElement {
  const [inputText, setInputText] = useState<string>('');
  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newInputText = e.target.value;
    setInputText(newInputText);
  };
  return (
    <SearchInputPresenter
      inputText={inputText}
      onSearchInputChange={onSearchInputChange}
    />
  );
}

export default SearchInputContainer;
