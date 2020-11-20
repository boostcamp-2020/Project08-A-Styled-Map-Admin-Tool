import React, { ReactElement, MouseEvent } from 'react';
import UpperButtonsPresenter from './UpperButtonsPresenter';

const compareButtonClickHandler = (e: MouseEvent<HTMLElement>) => {
  alert('비교 버튼 클릭!');
};

const fullScreenButtonClickHandler = (e: MouseEvent<HTMLElement>) => {
  alert('전체화면 버튼 클릭!');
};

function UpperButtonsContainer(): ReactElement {
  return (
    <UpperButtonsPresenter
      compareButtonClickHandler={compareButtonClickHandler}
      fullScreenButtonClickHandler={fullScreenButtonClickHandler}
    />
  );
}

export default UpperButtonsContainer;
