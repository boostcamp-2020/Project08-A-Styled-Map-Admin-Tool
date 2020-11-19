import React, { useState } from 'react';
import SidebarPresenter from './SidebarPresenter';
import SidebarHeader from './SidebarHeader/SidebarHeaderContainer';
import SidebarContentFewer from './SidebarContentFewer/SidebarContentContainer';
import SidebarContentMore from './SidebarContentMore/SidebarContentContainer';
import SidebarFooter from './SidebarFooter/SidebarFooterContainer';

function SidebarContainer(): React.ReactElement {
  const [isAdvanced, setIsAdvanced] = useState(false);

  return (
    <SidebarPresenter>
      <SidebarHeader isAdvanced={isAdvanced} />
      {isAdvanced ? <SidebarContentMore /> : <SidebarContentFewer />}
      <SidebarFooter isAdvanced={isAdvanced} setIsAdvanced={setIsAdvanced} />
    </SidebarPresenter>
  );
}

export default SidebarContainer;
