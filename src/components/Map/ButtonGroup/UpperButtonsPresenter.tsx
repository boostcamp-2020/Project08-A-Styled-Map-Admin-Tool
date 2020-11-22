import React, { ReactElement } from 'react';
import styled from '../../../utils/styles/styled';

import SearchInput from '../SearchInput/SearchInputContainer';
import Button from '../Button/ButtonPresenter';

interface UpperButtonsPropsInterface {
  compareButtonClickHandler?: (
    e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => void;
  fullScreenButtonClickHandler?: (
    e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => void;
}

const UpperButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 3;

  width: 300px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

function UpperButtonsPresenter({
  compareButtonClickHandler,
  fullScreenButtonClickHandler,
}: UpperButtonsPropsInterface): ReactElement {
  return (
    <UpperButtonsWrapper>
      <SearchInput />
      <ButtonsWrapper>
        <Button textContent="비교하기" onClick={compareButtonClickHandler} />
        <Button textContent="전체화면" onClick={fullScreenButtonClickHandler} />
      </ButtonsWrapper>
    </UpperButtonsWrapper>
  );
}

export default UpperButtonsPresenter;
