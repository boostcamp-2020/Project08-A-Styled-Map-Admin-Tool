import React, { ReactElement, RefObject } from 'react';
import styled from '../../../utils/styles/styled';
import useUpperButtons, {
  useUpperButtonsType,
} from '../../../hooks/map/useUpperButtons';

import Button from './Button';
import FullScreenIcon from '../../Icon/FullScreen';
import SmallScreenIcon from '../../Icon/SmallScreen';

interface UpperButtonsProps {
  mapRef: RefObject<HTMLDivElement>;
  historyBtnHandler: () => void;
}

const UpperButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 10;

  width: 240px;
`;

const SearchInput = styled.div`
  width: 100%;
  input[type='text'] {
    outline: none;
    box-shadow: 0 0 5px 1px ${(props) => props.theme.LIGHTGREY};
  }
  * {
    z-index: 20;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  z-index: 10;
`;

function UpperButtons({
  mapRef,
  historyBtnHandler,
}: UpperButtonsProps): ReactElement {
  const {
    isFullscreen,
    fullScreenButtonClickHandler,
    smallScreenButtonClickHandler,
  }: useUpperButtonsType = useUpperButtons({ mapRef });

  return (
    <UpperButtonsWrapper>
      <SearchInput id="search-bar" />
      <ButtonsWrapper>
        <Button
          fontSize="12px"
          width="60px"
          height="40px"
          onClick={historyBtnHandler}
        >
          History
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

export default UpperButtons;
