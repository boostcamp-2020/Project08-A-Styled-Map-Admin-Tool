import React from 'react';
import styled from '../../../utils/styles/styled';
import useInputRange from '../../../hooks/common/useInputRange';
import { StyleKeyType } from '../../../store/common/type';

const ColorWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ColorTitle = styled.label`
  margin: auto 0;
  font-size: 1.7rem;
  font-weight: 600;
  color: ${(props) => props.theme.GREY};
`;

const ColorCode = styled.div`
  margin: auto 0 auto 5px;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${(props) => props.theme.LIGHTGREY};
`;

const ColorPalette = styled.input`
  margin: 20px 20px 10px 20px;
  width: 100px;
  height: 40px;
`;

const Button = styled.button`
  width: 90%;
  margin: 10px 0;
  background-color: ${(props) => props.theme.WHITE};
  border: 1px solid ${(props) => props.theme.BLACK};
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => props.theme.GREEN};
    color: ${(props) => props.theme.WHITE};
  }
`;

interface ColorStyleProps {
  color: string;
  onStyleChange: (key: StyleKeyType, value: string | number) => void;
}

function ColorStyle({
  color,
  onStyleChange,
}: ColorStyleProps): React.ReactElement {
  const {
    curRange,
    rangeChangeHandler,
    rangeMouseUpHandler,
    initStyle,
  } = useInputRange({
    range: color,
    onStyleChange,
  });

  return (
    <ColorWrapper>
      <ColorTitle htmlFor="styler__color">색상</ColorTitle>
      <ColorCode>{curRange}</ColorCode>
      <Button onClick={() => initStyle(StyleKeyType.color)}>초기화</Button>
      <ColorPalette
        type="color"
        id="styler__color"
        onChange={rangeChangeHandler}
        onBlur={() => rangeMouseUpHandler(StyleKeyType.color)}
        value={curRange}
      />
    </ColorWrapper>
  );
}

export default ColorStyle;
