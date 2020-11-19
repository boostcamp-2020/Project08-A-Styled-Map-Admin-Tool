import React from 'react';
import styled from '../../../utils/styles/styled';

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: scroll;
`;

function SidebarContentPresenter(): React.ReactElement {
  return (
    <ContentWrapper>
      <div>This is advanced setting</div>
    </ContentWrapper>
  );
}

export default SidebarContentPresenter;
