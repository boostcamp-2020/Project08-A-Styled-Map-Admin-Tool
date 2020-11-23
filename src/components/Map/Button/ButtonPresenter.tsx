import React, { ReactElement, MouseEvent } from 'react';
import styled from '../../../utils/styles/styled';

interface ButtonPropsInterface {
  width?: string;
  height?: string;
  children?: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
}

const Button = styled.button<ButtonPropsInterface>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 7px 0 0 7px;

  border: 0;
  background-color: ${(props) => props.theme.WHITE};
  border-radius: 5px;
  box-shadow: 0 0 10px ${(props) => props.theme.GREY};
  font-weight: 600;
  color: ${(props) => props.theme.DARKGREY};

  &:hover {
    color: ${(props) => props.theme.GREEN};
  }
`;

function ButtonPresenter({
  width = '50px',
  height = '50px',
  children,
  onClick,
}: ButtonPropsInterface): ReactElement {
  return (
    <Button width={width} height={height} onClick={onClick}>
      {children}
    </Button>
  );
}

export default ButtonPresenter;
