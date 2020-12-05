import React, { ReactElement, RefObject } from 'react';
import styled from '../../../utils/styles/styled';
import useUpperButtons, {
  useUpperButtonsType,
} from '../../../hooks/map/useUpperButtons';
import useHistoryFeature from '../../../hooks/common/useHistoryFeature';

import Button from './Button';
import FullScreenIcon from '../../Icon/FullScreen';
import SmallScreenIcon from '../../Icon/SmallScreen';
import SearchInput from '../SearchInput/SearchInput';

interface UpperButtonsProps {
  mapRef: RefObject<HTMLDivElement>;
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

function UpperButtons({ mapRef }: UpperButtonsProps): ReactElement {
  const {
    isFullscreen,
    compareButtonClickHandler,
    fullScreenButtonClickHandler,
    smallScreenButtonClickHandler,
  }: useUpperButtonsType = useUpperButtons({ mapRef });

  const { clickHistoryBtnHandler } = useHistoryFeature();

  return (
    <UpperButtonsWrapper>
      <SearchInput />
      <ButtonsWrapper>
        <Button
          fontSize="12px"
          width="60px"
          height="40px"
          onClick={clickHistoryBtnHandler}
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
