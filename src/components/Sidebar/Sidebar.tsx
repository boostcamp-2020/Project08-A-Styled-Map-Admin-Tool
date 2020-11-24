import React from 'react';
import styled from '../../utils/styles/styled';
import useSidebar, { useSidebarType } from '../../hooks/useSidebar';

import SidebarHeader from './SidebarHeader/SidebarHeader';
import SidebarContentFewer from './SidebarContentFewer/SidebarContent';
import SidebarContentMore from './SidebarContentMore/SidebarContent';
import SidebarFooter from './SidebarFooter/SidebarFooter';

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 370px;
  height: 100vh;
`;

function SidebarPresenter(): React.ReactElement {
  const { isAdvanced, setIsAdvanced }: useSidebarType = useSidebar();

  return (
    <SidebarWrapper>
      <SidebarHeader isAdvanced={isAdvanced} />
      {isAdvanced ? <SidebarContentMore /> : <SidebarContentFewer />}
      <SidebarFooter isAdvanced={isAdvanced} setIsAdvanced={setIsAdvanced} />
    </SidebarWrapper>
  );
}

export default SidebarPresenter;
