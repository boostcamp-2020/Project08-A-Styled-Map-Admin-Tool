import React from 'react';
import styled from '../../../utils/styles/styled';
import { Range } from '../SidebarContentFewer/DepthItem';
import useInputRange from '../../../hooks/common/useInputRange';

const WeightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
`;

const WeightTitle = styled.label`
  margin-bottom: 10px;
  font-size: 1.7rem;
  font-weight: 600;
  color: ${(props) => props.theme.GREY};
`;

const WeightControlBar = styled(Range)`
  width: 100%;
  height: 2px;
`;

interface WeightStyleProps {
  weight: number;
  onStyleChange: (key: string, value: string | number) => void;
}

function WeightStyle({
  weight,
  onStyleChange,
}: WeightStyleProps): React.ReactElement {
  const { curRange, rangeChangeHandler, rangeMouseUpHandler } = useInputRange({
    range: weight,
    onStyleChange,
  });

  return (
    <WeightWrapper>
      <WeightTitle htmlFor="styler__weight">굵기</WeightTitle>
      <WeightControlBar
        type="range"
        min="0"
        max="8"
        step="0.5"
        id="styler__weight"
        value={curRange}
        onChange={rangeChangeHandler}
        onMouseUp={() => rangeMouseUpHandler('weight')}
      />
    </WeightWrapper>
  );
}

export default WeightStyle;
