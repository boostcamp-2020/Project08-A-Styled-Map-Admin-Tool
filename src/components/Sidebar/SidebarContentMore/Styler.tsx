import React from 'react';
import styled from '../../../utils/styles/styled';
import useStyleType, {
  UseStyleHookType,
} from '../../../hooks/sidebar/useStyleType';

// import ColorStyle from './ColorStyle';
import ColorStyle from './ColorStyle2';
import WeightStyle from './WeightStyle';
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

function Styler(): React.ReactElement {
  const {
    styleElement: { visibility, color, weight, saturation, lightness },
    onStyleChange,
    element,
  }: UseStyleHookType = useStyleType();

  if (!element) {
    return <></>;
  }

  return (
    <StylerWrapper>
      <StylerTitle>스타일</StylerTitle>
      <VisibilityStyle visibility={visibility} onStyleChange={onStyleChange} />
      <Hr />
      {/* <ColorStyle color={color} onStyleChange={onStyleChange} /> */}
      <ColorStyle
        color2={color}
        saturation={saturation}
        lightness={lightness}
        onStyleChange={onStyleChange}
      />
      <Hr />
      <WeightStyle weight={weight} onStyleChange={onStyleChange} />
      {/* <SaturationStyle saturation={saturation} onStyleChange={onStyleChange} />
      <LightnessStyle lightness={lightness} onStyleChange={onStyleChange} /> */}
    </StylerWrapper>
  );
}

export default Styler;
