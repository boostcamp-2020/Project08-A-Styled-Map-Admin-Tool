import React, { ReactElement } from 'react';
import styled from '../../../utils/styles/styled';

import SearchInput from '../SearchInput/SearchInputContainer';
import Button from '../Button/ButtonPresenter';
import FullScreenIcon from '../../Icon/FullScreen';
import SmallScreenIcon from '../../Icon/SmallScreen';

interface UpperButtonsPropsInterface {
  compareButtonClickHandler?: (
    e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => void;
  fullScreenButtonClickHandler?: () => void;
  smallScreenButtonClickHandler?: () => void;
  isFullscreen: boolean;
}

const UpperButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 10;

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
  smallScreenButtonClickHandler,
  isFullscreen,
}: UpperButtonsPropsInterface): ReactElement {
  return (
    <UpperButtonsWrapper>
      <SearchInput />
      <ButtonsWrapper>
        <Button width="40px" height="40px" onClick={compareButtonClickHandler}>
          비교하기
        </Button>
        <Button
          width="40px"
          height="40px"
          onClick={
            isFullscreen
              ? smallScreenButtonClickHandler
              : fullScreenButtonClickHandler
          }
        >
          {isFullscreen ? <SmallScreenIcon /> : <FullScreenIcon />}
        </Button>
      </ButtonsWrapper>
    </UpperButtonsWrapper>
  );
}

export default UpperButtonsPresenter;
