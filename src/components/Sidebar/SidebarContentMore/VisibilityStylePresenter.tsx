import React from 'react';
import styled from '../../../utils/styles/styled';

const VisibilityWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const VisibilityTitle = styled.h2`
  font-size: 1.7rem;
  font-weight: 600;
  color: gray;
  margin-bottom: 10px;
`;

const VisilityItem = styled.div`
  font-size: 1.6rem;
  margin-bottom: 5px;
`;

function VisibilityStylePresenter(): React.ReactElement {
  return (
    <VisibilityWrapper>
      <VisibilityTitle>가시성</VisibilityTitle>
      <VisilityItem>상위요소 상속</VisilityItem>
      <VisilityItem>보임</VisilityItem>
      <VisilityItem>숨김</VisilityItem>
    </VisibilityWrapper>
  );
}

export default VisibilityStylePresenter;
