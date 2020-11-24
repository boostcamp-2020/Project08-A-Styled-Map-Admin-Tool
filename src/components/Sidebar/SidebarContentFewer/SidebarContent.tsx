import React from 'react';
import styled from '../../../utils/styles/styled';
import SidebarContentDepth from './SidebarContentDepth';
import SidebarContentTheme from './SidebarContentTheme';

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: scroll;
`;

function SidebarContent(): React.ReactElement {
  return (
    <ContentWrapper>
      <SidebarContentDepth />
      <SidebarContentTheme />
    </ContentWrapper>
  );
}

export default SidebarContent;
