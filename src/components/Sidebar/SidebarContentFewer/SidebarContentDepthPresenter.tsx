import React from 'react';
import styled from '../../../utils/styles/styled';
import DepthItem from './DepthItemPresenter';

function SidebarDepthPresenter(): React.ReactElement {
  const DepthController = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `;

  const DepthControllerTitle = styled.h2`
    padding: 20px 8px 24px 8px;
    font-size: 2rem;
    font-weight: 600;
  `;

  const DepthList = styled.ul`
    width: 90%;
    margin: 0 auto;
  `;

  return (
    <DepthController>
      <DepthControllerTitle>표기 단계 조절</DepthControllerTitle>
      <DepthList>
        <DepthItem name="도로" />
        <DepthItem name="랜드마크" />
        <DepthItem name="라벨" />
      </DepthList>
    </DepthController>
  );
}

export default SidebarDepthPresenter;
