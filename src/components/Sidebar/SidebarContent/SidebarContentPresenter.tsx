import React from 'react';
import styled from '../../../utils/styles/styled';
import SidebarContentThemeContainer from './SidebarContentTheme/SidebarContentThemeContainer';

const ContentWrapper = styled.main`
  width: 80%;
  margin: 0 auto;
`;

function SidebarContentPresenter(): React.ReactElement {
  return (
    <ContentWrapper>
      <SidebarContentThemeContainer />
    </ContentWrapper>
  );
}

export default SidebarContentPresenter;
