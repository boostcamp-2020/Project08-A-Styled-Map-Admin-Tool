import React from 'react';
import styled from '../../../utils/styles/styled';

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

interface SidebarContentPresenterProps {
  children: React.ReactNode;
}

function SidebarContentPresenter({
  children,
}: SidebarContentPresenterProps): React.ReactElement {
  return <ContentWrapper>{children}</ContentWrapper>;
}

export default SidebarContentPresenter;
