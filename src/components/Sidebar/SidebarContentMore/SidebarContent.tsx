import React from 'react';
import styled from '../../../utils/styles/styled';
import FeatureType from './FeatureType';

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

function SidebarContent(): React.ReactElement {
  return (
    <ContentWrapper>
      <FeatureType />
    </ContentWrapper>
  );
}

export default SidebarContent;
