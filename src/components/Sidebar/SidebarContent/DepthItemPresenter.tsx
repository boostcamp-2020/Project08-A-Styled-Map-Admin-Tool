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
  background-color: #d3d3d3;
  outline: none;
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
