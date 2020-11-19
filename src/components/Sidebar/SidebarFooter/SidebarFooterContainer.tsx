import React from 'react';
import SidebarFooterPresenter from './SidebarFooterPresenter';

interface SidebarFooterContainerProps {
  isAdvanced: boolean;
  setIsAdvanced: (isAdvanced: boolean) => void;
}

function SidebarFooterContainer({
  isAdvanced,
  setIsAdvanced,
}: SidebarFooterContainerProps): React.ReactElement {
  const clickHandler = () => {
    setIsAdvanced(!isAdvanced);
  };

  return (
    <SidebarFooterPresenter
      isAdvanced={isAdvanced}
      clickHandler={clickHandler}
    />
  );
}

export default SidebarFooterContainer;
