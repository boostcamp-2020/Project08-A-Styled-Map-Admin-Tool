import { useState } from 'react';

export interface useSidebarHeaderType {
  isOpened: boolean;
  dropdownToggleHandler: () => void;
}

function useSidebarHeader(): useSidebarHeaderType {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dropdownToggleHandler = () => {
    setIsOpened(!isOpened);
  };

  return {
    isOpened,
    dropdownToggleHandler,
  };
}

export default useSidebarHeader;
