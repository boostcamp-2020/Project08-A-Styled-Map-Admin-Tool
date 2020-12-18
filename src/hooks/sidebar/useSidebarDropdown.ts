// Dependencies
import { useState } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { ReplaceType } from '../../store/common/type';
import { initDepthTheme } from '../../store/depth-theme/action';

// Hook
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
  const dispatch = useDispatch();
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const { changeStyle } = useWholeStyle();

  const importModalToggleHandler = () => {
    if (isOpened) dropdownToggleHandler();
    setIsModalOpened(!isModalOpened);
  };

  const resetClickHandler = () => {
    if (isOpened) dropdownToggleHandler();
    changeStyle({}, { changedKey: ReplaceType.init });
    dispatch(initDepthTheme());
  };

  return {
    importModalToggleHandler,
    resetClickHandler,
    isModalOpened,
  };
}

export default useSidebarDropdown;
