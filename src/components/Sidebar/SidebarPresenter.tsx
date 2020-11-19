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
  children: React.ReactNode; // 여기 타입이 뭐가 되야 할까요..?
}

function SidebarPresenter({
  children,
}: SidebarPresenterProps): React.ReactElement {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}

export default SidebarPresenter;
