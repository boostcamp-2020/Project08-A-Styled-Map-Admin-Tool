import React from 'react';
import styled from '../../../utils/styles/styled';
import { Range } from '../SidebarContentFewer/DepthItem';

const SaturationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
`;

const SaturationTitle = styled.label`
  margin-bottom: 10px;
  font-size: 1.7rem;
  font-weight: 600;
  color: ${(props) => props.theme.GREY};
`;

const SaturationControlBar = styled(Range)`
  width: 100%;
  height: 2px;
`;

function SaturationStyle(): React.ReactElement {
  return (
    <SaturationWrapper>
      <SaturationTitle htmlFor="styler__saturation">채도</SaturationTitle>
      <SaturationControlBar
        type="range"
        min="-100"
        max="100"
        step="5"
        id="styler__saturation"
      />
    </SaturationWrapper>
  );
}

export default SaturationStyle;
