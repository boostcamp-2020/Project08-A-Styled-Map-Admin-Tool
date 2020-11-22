import React, { ReactElement, MouseEvent } from 'react';
import styled from '../../../utils/styles/styled';

interface ButtonPropsInterface {
  width?: string;
  height?: string;
  textContent?: string;
  onClick?: (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
}

const ButtonWrapper = styled.p`
  text-align: center;
`;

const Button = styled.button<ButtonPropsInterface>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 7px 0 0 7px;

  border: 0;
  border-radius: 5px;
  padding: auto;
  background-color: white;
  box-shadow: 0 0 10px grey;
`;

function ButtonPresenter({
  width = '50px',
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
