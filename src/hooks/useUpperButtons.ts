import { MouseEvent, useState, useEffect } from 'react';

const compareButtonClickHandler = (e: MouseEvent<HTMLElement>) => {
  // alert('비교 버튼 클릭!');
};

export interface useUpperButtonsType {
  compareButtonClickHandler?: (
    e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => void;
  fullScreenButtonClickHandler?: () => void;
  smallScreenButtonClickHandler?: () => void;
  isFullscreen: boolean;
}

interface useUpperButtonsProps {
  fullscreenHandler: () => void;
  smallscreenHandler: () => void;
}

function useUpperButtons({
  fullscreenHandler,
  smallscreenHandler,
}: useUpperButtonsProps): useUpperButtonsType {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

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

  return {
    isFullscreen,
    compareButtonClickHandler,
    fullScreenButtonClickHandler,
    smallScreenButtonClickHandler,
  };
}

export default useUpperButtons;
