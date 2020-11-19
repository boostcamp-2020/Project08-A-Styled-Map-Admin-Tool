import React, { ReactElement, ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import SearchInputPropsInterface from './SearchInputPropsInterface';

const SearchInput = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 5px;

  text-align: center;

  border: 0;
  padding: auto;
  background-color: white;
  box-shadow: 0 0 10px grey;
`;

function SearchInputPresenter({
  width = '250px',
  height = '50px',
}: SearchInputPropsInterface): ReactElement {
  const [inputText, setInputText] = useState<string | number>('');

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newInputText = e.target.value;
    setInputText(newInputText);
  };

  return (
    <SearchInput
      value={inputText}
      onChange={onSearchInputChange}
      width={width}
      height={height}
    />
  );
}

export default SearchInputPresenter;
