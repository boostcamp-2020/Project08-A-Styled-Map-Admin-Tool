import React from 'react';
import styled from '@emotion/styled';

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 0 0 370px;
  height: 100vh;
  background-color: #444;
`;

function SidebarPresenter(): React.ReactElement {
  return <SidebarWrapper />;
}

export default SidebarPresenter;
