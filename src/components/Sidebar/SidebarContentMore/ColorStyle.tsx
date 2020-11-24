import React from 'react';
import styled from '../../../utils/styles/styled';

const ColorWrapper = styled.div``;

const ColorTitle = styled.label`
  margin-bottom: 10px;
  font-size: 1.7rem;
  font-weight: 600;
  color: ${(props) => props.theme.GREY};
`;

const ColorCode = styled.div``;

const ColorPalette = styled.input`
  margin: 10px 20px;
  width: 100px;
  height: 40px;
`;

function ColorStyle(): React.ReactElement {
  return (
    <ColorWrapper>
      <ColorTitle htmlFor="styler__color">색상</ColorTitle>
      <ColorCode />
      <ColorPalette type="color" id="styler__color" />
    </ColorWrapper>
  );
}

export default ColorStyle;
