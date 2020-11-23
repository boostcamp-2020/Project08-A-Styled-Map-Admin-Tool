import React, { ReactElement, MouseEvent, useState, useEffect } from 'react';
import UpperButtonsPresenter from './UpperButtonsPresenter';

const compareButtonClickHandler = (e: MouseEvent<HTMLElement>) => {
  alert('비교 버튼 클릭!');
};

interface UpperButtonsContainerProps {
  fullscreenHandler: () => void;
  smallscreenHandler: () => void;
}

function UpperButtonsContainer({
  fullscreenHandler,
  smallscreenHandler,
}: UpperButtonsContainerProps): ReactElement {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    window.document.onfullscreenchange = () => {
      if (!window.document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    return () => {
      window.document.onfullscreenchange = null;
    };
  }, []);

  const fullScreenButtonClickHandler = () => {
    fullscreenHandler();
    setIsFullscreen(!isFullscreen);
  };

  const smallScreenButtonClickHandler = () => {
    smallscreenHandler();
    setIsFullscreen(!isFullscreen);
  };

  return (
    <UpperButtonsPresenter
      compareButtonClickHandler={compareButtonClickHandler}
      fullScreenButtonClickHandler={fullScreenButtonClickHandler}
      smallScreenButtonClickHandler={smallScreenButtonClickHandler}
      isFullscreen={isFullscreen}
    />
  );
}

export default UpperButtonsContainer;
