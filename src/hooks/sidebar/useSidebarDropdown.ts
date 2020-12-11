import { useState } from 'react';
import useWholeStyle from '../common/useWholeStyle';

interface SidebarDropdownProps {
  isOpened: boolean;
  dropdownToggleHandler: () => void;
}

export interface useSidebarDropdownType {
  resetClickHandler: (e: React.MouseEvent) => void;
  importModalToggleHandler: () => void;
  isModalOpened: boolean;
}

function useSidebarDropdown({
  isOpened,
  dropdownToggleHandler,
}: SidebarDropdownProps): useSidebarDropdownType {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const { changeStyle } = useWholeStyle();

  const importModalToggleHandler = () => {
    if (isOpened) dropdownToggleHandler();
    setIsModalOpened(!isModalOpened);
  };

  const resetClickHandler = () => {
    changeStyle({});
  };

  return {
    importModalToggleHandler,
    resetClickHandler,
    isModalOpened,
  };
}

export default useSidebarDropdown;
