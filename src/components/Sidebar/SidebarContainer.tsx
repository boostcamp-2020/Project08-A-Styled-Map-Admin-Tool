import React from 'react';
import SidebarPresenter from './SidebarPresenter';
import SidebarHeader from './SidebarHeader/SidebarHeaderContainer';
import SidebarContent from './SidebarContent/SidebarContentContainer';
import SidebarFooter from './SidebarFooter/SidebarFooterContainer';

function SidebarContainer(): React.ReactElement {
  return (
    <SidebarPresenter>
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </SidebarPresenter>
  );
}

export default SidebarContainer;
