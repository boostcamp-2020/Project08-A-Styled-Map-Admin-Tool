import React from 'react';
import styled from '../../../utils/styles/styled';
import SidebarContentDepthPresenter from './SidebarContentDepthPresenter';

interface SidebarContentProps {
  children: React.ReactNode;
}

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: scroll;
`;

function SidebarContentPresenter({
  children,
}: SidebarContentProps): React.ReactElement {
  return (
    <ContentWrapper>
      <SidebarContentDepthPresenter />
      {children}
    </ContentWrapper>
  );
}

export default SidebarContentPresenter;
