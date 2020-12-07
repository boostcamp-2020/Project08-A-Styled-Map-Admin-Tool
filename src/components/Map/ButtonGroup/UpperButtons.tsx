import React, { ReactElement, RefObject } from 'react';
import styled from '../../../utils/styles/styled';
import useUpperButtons, {
  useUpperButtonsType,
} from '../../../hooks/map/useUpperButtons';

import { comparisonButtonClickHandlerType } from '../../../hooks/map/useComparisonButton';

import Button from './Button';
import FullScreenIcon from '../../Icon/FullScreen';
import SmallScreenIcon from '../../Icon/SmallScreen';
import SearchInput from '../SearchInput/SearchInput';

interface UpperButtonsProps {
  mapRef: RefObject<HTMLDivElement>;
//   comparisonButtonClickHandler: comparisonButtonClickHandlerType;
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

  width: 300px;
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
      <SearchInput />
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
