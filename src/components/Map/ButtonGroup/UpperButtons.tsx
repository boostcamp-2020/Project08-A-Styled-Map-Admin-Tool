import React, { ReactElement } from 'react';
import styled from '../../../utils/styles/styled';
import useUpperButtons, {
  useUpperButtonsType,
} from '../../../hooks/useUpperButtons';

import Button from '../Button/Button';
import FullScreenIcon from '../../Icon/FullScreen';
import SmallScreenIcon from '../../Icon/SmallScreen';
import SearchInput from '../SearchInput/SearchInput';

interface UpperButtonsProps {
  fullscreenHandler: () => void;
  smallscreenHandler: () => void;
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
  fullscreenHandler,
  smallscreenHandler,
}: UpperButtonsProps): ReactElement {
  const {
    isFullscreen,
    compareButtonClickHandler,
    fullScreenButtonClickHandler,
    smallScreenButtonClickHandler,
  }: useUpperButtonsType = useUpperButtons({
    fullscreenHandler,
    smallscreenHandler,
  });

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
