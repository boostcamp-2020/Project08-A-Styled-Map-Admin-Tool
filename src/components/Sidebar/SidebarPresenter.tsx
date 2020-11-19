import React from 'react';
import styled from '../../utils/styles/styled';

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 370px;
  height: 100vh;
`;

interface SidebarPresenterProps {
  children: React.ReactNode;
}

function SidebarPresenter({
  children,
}: SidebarPresenterProps): React.ReactElement {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}

export default SidebarPresenter;
