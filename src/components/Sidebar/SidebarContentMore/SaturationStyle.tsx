import React from 'react';
import styled from '../../../utils/styles/styled';
import { Range } from '../SidebarContentFewer/DepthItem';

// Hook
import useInputRange from '../../../hooks/common/useInputRange';

// Type
import {
  StyleDefaultKeyType,
  ColorSubStyleType,
} from '../../../store/common/type';

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

interface SaturationStyleProps {
  saturation: number;
  onStyleChange: (key: StyleDefaultKeyType, value: string | number) => void;
}

function SaturationStyle({
  saturation,
  onStyleChange,
}: SaturationStyleProps): React.ReactElement {
  const { curRange, rangeChangeHandler, rangeMouseUpHandler } = useInputRange({
    range: saturation,
    onStyleChange,
  });

  return (
    <SaturationWrapper>
      <SaturationTitle htmlFor="styler__saturation">채도</SaturationTitle>
      <SaturationControlBar
        type="range"
        min="1"
        max="100"
        step="1"
        id="styler__saturation"
        value={curRange}
        onChange={(e) => rangeChangeHandler(e)}
        onMouseUp={() => rangeMouseUpHandler(ColorSubStyleType.saturation)}
      />
    </SaturationWrapper>
  );
}

export default SaturationStyle;
