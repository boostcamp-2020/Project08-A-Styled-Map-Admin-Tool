import React, { useState } from 'react';
import styled from '../../../utils/styles/styled';
// import useInputRange from '../../../hooks/common/useInputRange';
import { StyleKeyType } from '../../../store/common/type';
// import useStyleType from '../../../hooks/sidebar/useStyleType';
import SaturationStyle from './SaturationStyle';
import LightnessStyle from './LightnessStyle';

const ColorWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const ColorTitle = styled.label`
  margin: auto 0;
  font-size: 1.7rem;
  font-weight: 600;
  color: ${(props) => props.theme.GREY};
`;

interface ColorCurrentTypes {
  currentColor: string;
}

const ColorCurrent = styled.div<ColorCurrentTypes>`
  border: 1px solid ${(props) => props.theme.GREY};
  margin: 20px 20px 10px 20px;
  width: 100px;
  height: 40px;
  background-color: ${({ currentColor }) => `${currentColor}`};
`;

interface ColorPickerTypes {
  isToggle: boolean;
}

const ColorPicker = styled.div<ColorPickerTypes>`
  display: ${({ isToggle }) => (isToggle ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ColorPalette = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: 120px;
  height: max-content;
`;

interface SingleColorTypes {
  thisColor: string;
}

const SingleColor = styled.div<SingleColorTypes>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: ${({ thisColor }) => `${thisColor}`};
`;

const ColorCode = styled.div`
  margin: auto 0 auto 5px;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${(props) => props.theme.LIGHTGREY};
`;
const ColorSaturation = styled.div`
  margin: auto 0 auto 5px;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${(props) => props.theme.LIGHTGREY};
`;
const ColorLightness = styled.div`
  margin: auto 0 auto 5px;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${(props) => props.theme.LIGHTGREY};
`;

interface ColorStyleProps {
  color2: string;
  saturation: number;
  lightness: number;
  onStyleChange: (key: StyleKeyType, value: string | number) => void;
}

const baseColors = [
  { key: 1, value: '#f44336' },
  { key: 2, value: '#e91e63' },
  { key: 3, value: '#9c27b0' },
  { key: 4, value: '#673ab7' },
  { key: 5, value: '#3f51b5' },
  { key: 6, value: '#2196f3' },
  { key: 7, value: '#03a9f4' },
  { key: 8, value: '#00bcd4' },
  { key: 9, value: '#009688' },
  { key: 10, value: '#4caf50' },
  { key: 11, value: '#8bc34a' },
  { key: 12, value: '#cddc39' },
  { key: 13, value: '#ffeb3b' },
  { key: 14, value: '#ffc107' },
  { key: 15, value: '#ff9800' },
  { key: 16, value: '#ff5722' },
  { key: 17, value: '#795548' },
  { key: 18, value: '#9e9e9e' },
];

function ColorStyle({
  color2,
  saturation,
  lightness,
  onStyleChange,
}: ColorStyleProps): React.ReactElement {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const [currentColor, setCurrentColor] = useState<string>('');

  const colorPickerClickHandler = () => {
    setIsToggle(!isToggle);
  };

  const singleColorClickHandler = (value: string) => {
    setCurrentColor(value);
  };

  return (
    <ColorWrapper>
      <ColorTitle htmlFor="styler__color">색상</ColorTitle>
      <ColorCurrent
        currentColor={currentColor}
        onClick={colorPickerClickHandler}
      />
      <ColorCode>{currentColor}</ColorCode>
      <ColorSaturation>{saturation}</ColorSaturation>
      <ColorLightness>{lightness}</ColorLightness>
      <ColorPicker isToggle={isToggle}>
        <ColorPalette>
          {baseColors.map(({ key, value }) => (
            <SingleColor
              key={key}
              thisColor={value}
              onClick={() => singleColorClickHandler(value)}
            />
          ))}
        </ColorPalette>
        <SaturationStyle
          saturation={saturation}
          onStyleChange={onStyleChange}
        />
        <LightnessStyle lightness={lightness} onStyleChange={onStyleChange} />
      </ColorPicker>
    </ColorWrapper>
  );
}

export default ColorStyle;
