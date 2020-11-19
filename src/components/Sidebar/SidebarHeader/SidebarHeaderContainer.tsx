import React from 'react';
import SidebarHeaderPresenter from './SidebarHeaderPresenter';

interface SidebarHeaderContainerProps {
  isAdvanced: boolean;
}

function SidebarHeaderContainer({
  isAdvanced,
}: SidebarHeaderContainerProps): React.ReactElement {
  return <SidebarHeaderPresenter isAdvanced={isAdvanced} />;
}

export default SidebarHeaderContainer;
