import React from 'react';
import styled from '../../../utils/styles/styled';
import { Range } from '../SidebarContentFewer/DepthItemPresenter';

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

const ColorWrapper = styled.div``;

const ColorTitle = styled.label`
  margin-bottom: 10px;
  font-size: 1.7rem;
  font-weight: 600;
  color: gray;
`;

const ColorCode = styled.div``;

const ColorPalette = styled.input`
  margin: 10px 20px;
  width: 100px;
  height: 40px;
`;

const WeightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
`;

const WeightTitle = styled.label`
  margin-bottom: 10px;
  font-size: 1.7rem;
  font-weight: 600;
  color: gray;
`;

const WeightControlBar = styled(Range)`
  width: 100%;
`;

const SaturationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
`;

const SaturationTitle = styled.label`
  margin-bottom: 10px;
  font-size: 1.7rem;
  font-weight: 600;
  color: gray;
`;

const SaturationControlBar = styled(Range)`
  width: 100%;
`;

const LightnessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
`;

const LightnessTitle = styled.label`
  margin-bottom: 10px;
  font-size: 1.7rem;
  font-weight: 600;
  color: gray;
`;

const LightnessControlBar = styled(Range)`
  width: 100%;
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
      <VisibilityWrapper>
        <VisibilityTitle>가시성</VisibilityTitle>
        <VisilityItem>상위요소 상속</VisilityItem>
        <VisilityItem>보임</VisilityItem>
        <VisilityItem>숨김</VisilityItem>
      </VisibilityWrapper>
      <Hr />
      <ColorWrapper>
        <ColorTitle htmlFor="styler__color">색상</ColorTitle>
        <ColorCode />
        <ColorPalette type="color" id="styler__color" />
      </ColorWrapper>
      <Hr />
      <WeightWrapper>
        <WeightTitle htmlFor="styler__weight">굵기</WeightTitle>
        <WeightControlBar
          type="range"
          min="0"
          max="8"
          step="0.5"
          id="styler__weight"
        />
      </WeightWrapper>
      <SaturationWrapper>
        <SaturationTitle htmlFor="styler__saturation">채도</SaturationTitle>
        <SaturationControlBar
          type="range"
          min="-100"
          max="100"
          step="5"
          id="styler__saturation"
        />
      </SaturationWrapper>
      <LightnessWrapper>
        <LightnessTitle htmlFor="styler__lightness">밝기</LightnessTitle>
        <LightnessControlBar
          type="range"
          min="-100"
          max="100"
          step="5"
          id="styler__lightness"
        />
      </LightnessWrapper>
    </StylerWrapper>
  );
}

export default StylerPresenter;
