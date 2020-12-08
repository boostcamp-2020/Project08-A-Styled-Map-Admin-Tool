import React, { ReactElement, MouseEvent } from 'react';
import styled from '../../../utils/styles/styled';

interface ButtonPropsInterface {
  width?: string;
  height?: string;
  fontSize?: string;
  children?: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
}

const Button = styled.button<ButtonPropsInterface>`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${(props) => props.fontSize};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 7px 0 0 7px;

  border: 0;
  background-color: ${(props) => props.theme.WHITE};
  border-radius: 4px;

  box-sizing: border-box;
  box-shadow: 0 0 1px 2px ${(props) => props.theme.GREY};
  font-weight: 600;
  color: ${(props) => props.theme.DARKGREY};

  &:hover {
    color: ${(props) => props.theme.GREEN};
    background-color: rgb(230, 230, 230);
  }
`;

function ButtonPresenter({
  fontSize = '10px',
  width = '50px',
  height = '50px',
  children,
  onClick,
}: ButtonPropsInterface): ReactElement {
  return (
    <Button fontSize={fontSize} width={width} height={height} onClick={onClick}>
      {children}
    </Button>
  );
}

export default ButtonPresenter;
