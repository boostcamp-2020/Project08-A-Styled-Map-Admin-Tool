import React from 'react';
import styled from '../../../utils/styles/styled';

const ItemWrapper = styled.div`
  display: flex;
  padding: 0 16px 24px 16px;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 600;
`;

const Range = styled.input`
  -webkit-appearance: none;
  opacity: 0.7;
  width: 70%;
  height: 3px;
  background-color: gray;
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
}

function DepthItemPresenter({ name }: ItemPresenterProps): React.ReactElement {
  return (
    <ItemWrapper>
      <Label htmlFor={name}>{name}</Label>
      <Range name={name} type="range" min="1" max="4" step="1" />
    </ItemWrapper>
  );
}

export default DepthItemPresenter;
