import React, { useState } from 'react';
import SidebarHeaderPresenter from './SidebarHeaderPresenter';
import SidebarDropdownContainer from './SidebarDropdownContainer';

interface SidebarHeaderContainerProps {
  isAdvanced: boolean;
}

function SidebarHeaderContainer({
  isAdvanced,
}: SidebarHeaderContainerProps): React.ReactElement {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownToggleHandler = () => {
    setIsOpened(!isOpened);
  };

  return (
    <SidebarHeaderPresenter
      isAdvanced={isAdvanced}
      onClickDropdown={dropdownToggleHandler}
    >
      <SidebarDropdownContainer
        isOpened={isOpened}
        dropdownToggleHandler={dropdownToggleHandler}
      />
    </SidebarHeaderPresenter>
  );
}

export default SidebarHeaderContainer;
