import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import ButtonPropsInterface from './ButtonPropsInterface';

const Button = styled.button<ButtonPropsInterface>`
  display: flex;
  width: ${(props) => props.width};
`;

function ButtonPresenter(props: ButtonPropsInterface): ReactElement {
  const { textContent } = props;
  return <Button {...props}>{textContent}</Button>;
}

export default ButtonPresenter;
