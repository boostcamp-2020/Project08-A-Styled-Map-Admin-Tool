import { MouseEvent, useState, useEffect, RefObject } from 'react';

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
  mapRef: RefObject<HTMLDivElement>;
}

function useUpperButtons({
  mapRef,
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
    if (mapRef.current) {
      mapRef.current.requestFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const smallScreenButtonClickHandler = () => {
    if (window.document.fullscreenElement) {
      window.document.exitFullscreen();
    }
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
