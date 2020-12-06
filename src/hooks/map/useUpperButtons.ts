import { useState, useEffect, useRef, RefObject } from 'react';

export interface useUpperButtonsType {
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
    fullScreenButtonClickHandler,
    smallScreenButtonClickHandler,
  };
}

export default useUpperButtons;
