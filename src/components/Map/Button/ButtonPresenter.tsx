import React, { ReactElement, MouseEvent } from 'react';
import styled from '../../../utils/styles/styled';

interface ButtonPropsInterface {
  width?: string;
  height?: string;
  textContent?: string;
  onClick?: (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
}

const Button = styled.button<ButtonPropsInterface>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 7px 0 0 7px;

  border: 0;
  padding: auto;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px grey;
  font-weight: 600;
  color: ${(props) => props.theme.DARKGREY};

  &:hover {
    color: ${(props) => props.theme.GREEN};
  }
`;

function ButtonPresenter({
  width = '50px',
  height = '50px',
  textContent,
  onClick,
}: ButtonPropsInterface): ReactElement {
  return (
    <Button width={width} height={height} onClick={onClick}>
      {textContent}
    </Button>
  );
}

export default ButtonPresenter;
