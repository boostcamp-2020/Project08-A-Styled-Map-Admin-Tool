import React, { useState } from 'react';
import SidebarDropdown from './SidebarDropdownPresenter';
import ImportModalContainer from '../SidebarModal/ImportModalContainer';

interface SidebarDropdownContainerProps {
  isOpened: boolean;
  dropdownToggleHandler: () => void;
}

function SidebarDropdownContainer({
  isOpened,
  dropdownToggleHandler,
}: SidebarDropdownContainerProps): React.ReactElement | null {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const importModalToggleHandler = () => {
    if (isOpened) dropdownToggleHandler();
    setIsModalOpened(!isModalOpened);
  };

  const resetClickHandler = () => {
    // 전역 상태 초기화
  };

  return (
    <>
      {isOpened ? (
        <SidebarDropdown
          importModalToggleHandler={importModalToggleHandler}
          resetClickHandler={resetClickHandler}
        />
      ) : (
        <></>
      )}
      {isModalOpened ? (
        <ImportModalContainer
          importModalToggleHandler={importModalToggleHandler}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default SidebarDropdownContainer;
