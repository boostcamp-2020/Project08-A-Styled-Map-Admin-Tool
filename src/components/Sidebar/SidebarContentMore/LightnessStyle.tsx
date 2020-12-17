// Dependencies
import React from 'react';
import styled from '../../../utils/styles/styled';
import { Range } from '../SidebarContentFewer/DepthItem';

// Hook
import useInputRange from '../../../hooks/common/useInputRange';

// Type
import {
  ColorSubStyleType,
  StyleDefaultKeyType,
} from '../../../store/common/type';

const LightnessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
`;

const LightnessTitle = styled.label`
  margin-bottom: 10px;
  font-size: 1.7rem;
  font-weight: 600;
  color: ${(props) => props.theme.GREY};
`;

const LightnessControlBar = styled(Range)`
  width: 100%;
  height: 2px;
`;

interface LightnessPropsInterface {
  lightness: number;
  onStyleChange: (key: StyleDefaultKeyType, value: string | number) => void;
}

function LightnessStyle({
  lightness,
  onStyleChange,
}: LightnessPropsInterface): React.ReactElement {
  const { curRange, rangeChangeHandler, rangeMouseUpHandler } = useInputRange({
    range: lightness,
    onStyleChange,
  });

  return (
    <div>
      <LightnessWrapper>
        <LightnessTitle htmlFor="styler__lightness">밝기</LightnessTitle>
        <LightnessControlBar
          type="range"
          min="1"
          max="100"
          step="1"
          id="styler__lightness"
          value={curRange}
          onChange={(e) => rangeChangeHandler(e)}
          onMouseUp={() => rangeMouseUpHandler(ColorSubStyleType.lightness)}
        />
      </LightnessWrapper>
    </div>
  );
}

export default LightnessStyle;
