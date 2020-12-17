// Dependencies
import React, { memo } from 'react';
import styled from '../../utils/styles/styled';
import SidebarHeader from './SidebarHeader/SidebarHeader';
import SidebarContentFewer from './SidebarContentFewer/SidebarContent';
import SidebarContentMore from './SidebarContentMore/SidebarContent';
import SidebarFooter from './SidebarFooter/SidebarFooter';

// Hook
import useSidebar, {
  ToggleStatusHook,
} from '../../hooks/sidebar/useToggleStatus';

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 370px;
  height: 100vh;
  z-index: 30;
  background-color: white;
  font-family: 'Noto Sans KR', sans-serif;
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

export default memo(SidebarPresenter);
