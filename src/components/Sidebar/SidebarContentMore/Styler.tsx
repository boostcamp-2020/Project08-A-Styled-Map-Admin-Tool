// Dependencies
import React from 'react';
import styled from '../../../utils/styles/styled';
import ColorStyle from './ColorStyle';
import SaturationStyle from './SaturationStyle';
import LightnessStyle from './LightnessStyle';
import WeightStyle from './WeightStyle';
import VisibilityStyle from './VisibilityStyle';

// Type
import useStyleType, {
  UseStyleHookType,
} from '../../../hooks/sidebar/useStyleType';

// Utils
import { hexToHSL } from '../../../utils/colorFormat';

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
    styleElement: { visibility, color, weight },
    onStyleChange,
    subFeature,
    element,
  }: UseStyleHookType = useStyleType();

  if (!element) {
    return <></>;
  }

  const { s: saturation, l: lightness } = hexToHSL(color);

  return (
    <StylerWrapper>
      <StylerTitle>스타일</StylerTitle>
      <VisibilityStyle
        subFeature={subFeature}
        visibility={visibility}
        onStyleChange={onStyleChange}
      />
      <Hr />
      <ColorStyle color={color} onStyleChange={onStyleChange} />
      <Hr />
      <WeightStyle weight={weight} onStyleChange={onStyleChange} />
      <SaturationStyle saturation={saturation} onStyleChange={onStyleChange} />
      <LightnessStyle lightness={lightness} onStyleChange={onStyleChange} />
    </StylerWrapper>
  );
}

export default Styler;
