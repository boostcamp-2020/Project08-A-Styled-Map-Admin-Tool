import React, { memo } from 'react';
import useSidebarDepthItem, {
  DepthItemKeyTypes,
} from '../../../hooks/sidebar/useSidebarDepthItem';
import styled from '../../../utils/styles/styled';

const ItemWrapper = styled.li`
  display: flex;
  padding: 0 16px 24px 16px;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 600;
`;

export const Range = styled.input`
  -webkit-appearance: none;
  opacity: 0.7;
  width: 70%;
  height: 3px;
  background-color: ${(props) => props.theme.GREY};
  outline: none;
  border: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.GREEN};
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.GREEN};
    cursor: pointer;
    border: none;
  }
`;

interface ItemPresenterProps {
  name: string;
  itemKey: DepthItemKeyTypes;
}

function DepthItemPresenter({
  name,
  itemKey,
}: ItemPresenterProps): React.ReactElement {
  const { depth, depthRef, depthRangeHandler } = useSidebarDepthItem(itemKey);

  return (
    <ItemWrapper>
      <Label htmlFor={name}>{name}</Label>
      <Range
        name={name}
        type="range"
        min="1"
        max="3"
        step="1"
        ref={depthRef}
        value={depth}
        onChange={depthRangeHandler}
      />
    </ItemWrapper>
  );
}

export default memo(DepthItemPresenter);
