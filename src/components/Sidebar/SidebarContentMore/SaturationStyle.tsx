import React from 'react';
import styled from '../../../utils/styles/styled';
import { Range } from '../SidebarContentFewer/DepthItem';
import useInputRange from '../../../hooks/common/useInputRange';
import { StyleKeyType } from '../../../store/common/type';
import AAA from './AAA';

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
  onStyleChange: (key: StyleKeyType, value: string | number) => void;
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
        min="-100"
        max="100"
        step="5"
        id="styler__saturation"
        value={curRange}
        onChange={(e) => rangeChangeHandler(e)}
        onMouseUp={() => rangeMouseUpHandler(StyleKeyType.saturation)}
      />
      {/* <AAA value="50" onStyleChange={onStyleChange} /> */}
    </SaturationWrapper>
  );
}

export default SaturationStyle;
