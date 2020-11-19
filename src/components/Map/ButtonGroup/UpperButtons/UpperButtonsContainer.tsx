import React, { ReactElement, MouseEvent } from 'react';
import UpperButtonsPresenter from './UpperButtonsPresenter';

const compareButtonClickHandler = (e: MouseEvent<HTMLElement>) => {
  console.log(e.currentTarget);
  alert('비교 버튼 클릭!');
};

function UpperButtonsContainer(): ReactElement {
  return (
    <UpperButtonsPresenter
      compareButtonClickHandler={compareButtonClickHandler}
    />
  );
}

export default UpperButtonsContainer;
