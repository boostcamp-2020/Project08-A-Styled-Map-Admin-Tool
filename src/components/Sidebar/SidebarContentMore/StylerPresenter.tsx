import React from 'react';
import styled from '../../../utils/styles/styled';
import ColorStylePresenter from './ColorStylePresenter';
import WeightStylePresenter from './WeightStylePresenter';
import SaturationStylePresenter from './SaturationStylePresenter';
import LightnessStyleWrapper from './LightnessStyleWrapper';
import VisibilityStylePresenter from './VisibilityStylePresenter';

const StylerWrapper = styled.div`
  height: 100%;
  width: 230px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid lightgray;
  padding: 20px 30px;
`;

const StylerTitle = styled.h2`
  width: 100%;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 45px;
  text-align: center;
`;

const Hr = styled.hr`
  width: 80%;
  margin-top: 25px;
  margin-bottom: 25px;
`;

interface StylerPresenterProps {
  detailName: string;
}

function StylerPresenter({
  detailName,
}: StylerPresenterProps): React.ReactElement {
  if (!detailName) {
    return <></>;
  }

  return (
    <StylerWrapper>
      <StylerTitle>스타일</StylerTitle>
      <VisibilityStylePresenter />
      <Hr />
      <ColorStylePresenter />
      <Hr />
      <WeightStylePresenter />
      <SaturationStylePresenter />
      <LightnessStyleWrapper />
    </StylerWrapper>
  );
}

export default StylerPresenter;
