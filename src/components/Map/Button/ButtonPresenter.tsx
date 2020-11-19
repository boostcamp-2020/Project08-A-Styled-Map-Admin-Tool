import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

interface ButtonPropsInterface {
  width?: string;
  height?: string;
  textContent?: string;
  onClick?: (e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
}

const ButtonWrapper = styled.p`
  text-align: center;
`;

const Button = styled.button<ButtonPropsInterface>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 5px 0;

  border: 0;
  padding: auto;
  background-color: white;
  box-shadow: 0 0 10px grey;
`;

function ButtonPresenter({
  width = '100px',
  height = '50px',
  textContent,
  onClick,
}: ButtonPropsInterface): ReactElement {
  return (
    <ButtonWrapper>
      <Button width={width} height={height} onClick={onClick}>
        {textContent}
      </Button>
    </ButtonWrapper>
  );
}

export default ButtonPresenter;
