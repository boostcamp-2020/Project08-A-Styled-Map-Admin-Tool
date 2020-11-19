import React, { ReactElement, MouseEvent } from 'react';
import styled from '@emotion/styled';

import UpperButtonsPropsInterface from './UpperButtonsPropsInterface';
import SearchInput from '../../SearchInput/SearchInputContainer';
import Button from '../../Button/ButtonContainer';

const UpperButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;

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
`;

function UpperButtonsPresenter({
  compareButtonClickHandler,
}: UpperButtonsPropsInterface): ReactElement {
  const onCompareButtonClick = (e: MouseEvent<HTMLElement>) => {
    compareButtonClickHandler(e);
  };

  return (
    <UpperButtonsWrapper>
      <SearchInput />
      <ButtonsWrapper>
        <Button textContent="비교하기" onClick={onCompareButtonClick} />
        <Button textContent="전체화면" />
      </ButtonsWrapper>
    </UpperButtonsWrapper>
  );
}

export default UpperButtonsPresenter;
