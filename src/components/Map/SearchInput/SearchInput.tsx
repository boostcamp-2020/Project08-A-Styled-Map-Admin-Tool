import React, { ReactElement } from 'react';
import styled from '../../../utils/styles/styled';
import useInputText, {
  InputTextHookType,
} from '../../../hooks/common/useInputText';

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  margin: 0;
  padding-left: 15px;
  z-index: 10;

  border: 0;
  border-radius: 5px;

  background-color: ${(props) => props.theme.WHITE};
  box-shadow: 0 0 1px 2px ${(props) => props.theme.GREY};

  text-align: left;
  font-family: 'Noto Sans KR', sans-serif;
`;

function SearchInputPresenter(): ReactElement {
  const { inputText, onInputChange }: InputTextHookType = useInputText();

  return (
    <SearchInput
      value={inputText}
      onChange={onInputChange}
      placeholder="검색할 장소를 입력하세요"
    />
  );
}

export default SearchInputPresenter;
