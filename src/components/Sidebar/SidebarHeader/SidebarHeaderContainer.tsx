import React, { useState } from 'react';
import SidebarHeaderPresenter from './SidebarHeaderPresenter';

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
    </SidebarHeaderPresenter>
  );
}

export default SidebarHeaderContainer;
