import React from 'react';
import styled from '../../utils/styles/styled';
import useSidebar, {
  ToggleStatusHook,
} from '../../hooks/sidebar/useToggleStatus';

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
  z-index: 10;
  background-color: white;
`;

function SidebarPresenter(): React.ReactElement {
  const { isActive, setIsActive }: ToggleStatusHook = useSidebar();

  return (
    <SidebarWrapper>
      <SidebarHeader isAdvanced={isActive} />
      {isActive ? <SidebarContentMore /> : <SidebarContentFewer />}
      <SidebarFooter isAdvanced={isActive} setIsAdvanced={setIsActive} />
    </SidebarWrapper>
  );
}

export default SidebarPresenter;
