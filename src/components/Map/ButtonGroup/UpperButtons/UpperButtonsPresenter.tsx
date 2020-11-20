import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import SearchInput from '../../SearchInput/SearchInputContainer';
import Button from '../../Button/ButtonPresenter';

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
  top: 10px;
  right: 10px;
  z-index: 3;

  width: 250px;
  height: 120px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
