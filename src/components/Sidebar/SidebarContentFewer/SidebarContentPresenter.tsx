import React from 'react';
import styled from '../../../utils/styles/styled';
import SidebarContentThemeContainer from './SidebarContentThemeContainer';
import SidebarContentDepthPresenter from './SidebarContentDepthPresenter';

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: scroll;
`;

function SidebarContentPresenter(): React.ReactElement {
  return (
    <ContentWrapper>
      <SidebarContentDepthPresenter />
      <SidebarContentThemeContainer />
    </ContentWrapper>
  );
}

export default SidebarContentPresenter;
