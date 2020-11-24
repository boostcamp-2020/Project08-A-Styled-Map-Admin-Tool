import React from 'react';
import SidebarContentPresenter from './SidebarContentPresenter';
import SidebarContentThemeContainer from './SidebarContentThemeContainer';

function SidebarContentContainer(): React.ReactElement {
  return (
    <SidebarContentPresenter>
      <SidebarContentThemeContainer />
    </SidebarContentPresenter>
  );
}

export default SidebarContentContainer;
