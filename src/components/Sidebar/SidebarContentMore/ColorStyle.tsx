import React from 'react';
import styled from '../../../utils/styles/styled';
import useInputRange from '../../../hooks/common/useInputRange';

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

interface ColorStyleProps {
  color: string;
  onStyleChange: (key: string, value: string | number) => void;
}

function ColorStyle({
  color,
  onStyleChange,
}: ColorStyleProps): React.ReactElement {
  const { curRange, rangeChangeHandler, rangeMouseUpHandler } = useInputRange({
    range: color,
    onStyleChange,
  });

  return (
    <ColorWrapper>
      <ColorTitle htmlFor="styler__color">색상</ColorTitle>
      <ColorCode>{curRange}</ColorCode>
      <ColorPalette
        type="color"
        id="styler__color"
        onChange={rangeChangeHandler}
        onBlur={() => rangeMouseUpHandler('color')}
        value={curRange}
      />
    </ColorWrapper>
  );
}

export default ColorStyle;
