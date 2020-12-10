import React, { memo } from 'react';
import { DepthItemKeyTypes } from '../../../hooks/sidebar/useSidebarDepthItem';
import styled from '../../../utils/styles/styled';
import DepthItem from './DepthItem';

function SidebarDepth(): React.ReactElement {
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
        <DepthItem name="도로" itemKey={DepthItemKeyTypes.road} />
        <DepthItem name="행정구역" itemKey={DepthItemKeyTypes.administrative} />
      </DepthList>
    </DepthController>
  );
}

export default memo(SidebarDepth);
