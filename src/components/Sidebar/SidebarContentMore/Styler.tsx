import React from 'react';
import styled from '../../../utils/styles/styled';
import {
  FeatureNameType,
  ElementNameType,
  SubElementNameType,
} from '../../../store/common/type';
import useStyleType, {
  UseStyleHookType,
} from '../../../hooks/sidebar/useStyleType';

import ColorStyle from './ColorStyle';
import WeightStyle from './WeightStyle';
import SaturationStyle from './SaturationStyle';
import LightnessStyleWrapper from './LightnessStyleWrapper';
import VisibilityStyle from './VisibilityStyle';

const StylerWrapper = styled.div`
  height: 100%;
  width: 230px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${(props) => props.theme.LIGHTGREY};
  padding: 20px 30px;
  overflow-y: scroll;
`;

const StylerTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  padding-bottom: 40px;
  text-align: center;
`;

const Hr = styled.hr`
  width: 80%;
  margin-top: 25px;
  margin-bottom: 25px;
  color: ${(props) => props.theme.GREY};
`;

interface StylerProps {
  featureName: FeatureNameType;
  subFeatureName: string;
  detailName: ElementNameType;
  subDetailName?: SubElementNameType;
}

function Styler({
  featureName,
  subFeatureName,
  detailName,
  subDetailName,
}: StylerProps): React.ReactElement {
  const { style }: UseStyleHookType = useStyleType({
    featureName,
    subFeatureName,
    detailName,
    subDetailName,
  });

  if (!detailName) {
    return <></>;
  }

  return (
    <StylerWrapper>
      <StylerTitle>스타일</StylerTitle>
      <VisibilityStyle />
      <Hr />
      <ColorStyle />
      <Hr />
      <WeightStyle />
      <SaturationStyle />
      <LightnessStyleWrapper />
    </StylerWrapper>
  );
}

export default Styler;
