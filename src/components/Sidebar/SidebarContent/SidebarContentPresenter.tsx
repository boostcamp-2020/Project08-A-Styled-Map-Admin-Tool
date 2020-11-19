import React from 'react';
import styled from '../../../utils/styles/styled';
import DepthItem from './DepthItemPresenter';

const ContentWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

const DepthController = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DepthControllerTitle = styled.p`
  padding: 0 16px 24px 16px;
  font-size: 2rem;
  font-weight: 600;
`;

function SidebarContentPresenter(): React.ReactElement {
  return (
    <ContentWrapper>
      <DepthController>
        <DepthControllerTitle>표기 단계 조절</DepthControllerTitle>
        <DepthItem name="도로" />
        <DepthItem name="랜드마크" />
        <DepthItem name="라벨" />
      </DepthController>
    </ContentWrapper>
  );
}

export default SidebarContentPresenter;
