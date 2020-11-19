import React, { ReactElement, MouseEvent } from 'react';
import Button from './ButtonPresenter';

import ButtonPropsInterface from './ButtonPropsInterface';

function ButtonContainer({
  width,
  height,
  textContent,
  onClick,
}: ButtonPropsInterface): ReactElement {
  return (
    <Button
      width={width}
      height={height}
      textContent={textContent}
      onClick={(e: MouseEvent<HTMLElement>) => onClick(e)}
    />
  );
}

export default ButtonContainer;
