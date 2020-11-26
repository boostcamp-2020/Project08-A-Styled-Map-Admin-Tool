import { useState } from 'react';

interface SidebarDropdownProps {
  isOpened: boolean;
  dropdownToggleHandler: () => void;
}

export interface useSidebarDropdownType {
  resetClickHandler: (e: React.MouseEvent) => void;
  importModalToggleHandler: (e: React.MouseEvent) => void;
  isModalOpened: boolean;
}

function useSidebarDropdown({
  isOpened,
  dropdownToggleHandler,
}: SidebarDropdownProps): useSidebarDropdownType {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const importModalToggleHandler = () => {
    if (isOpened) dropdownToggleHandler();
    setIsModalOpened(!isModalOpened);
  };

  const resetClickHandler = () => {
    // 전역 상태 초기화
  };

  return {
    importModalToggleHandler,
    resetClickHandler,
    isModalOpened,
  };
}

export default useSidebarDropdown;
