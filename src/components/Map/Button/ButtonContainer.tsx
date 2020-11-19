import React, { ReactElement } from 'react';
import Button from './ButtonPresenter';

import ButtonPropsInterface from './ButtonPropsInterface';

function ButtonContainer(props: ButtonPropsInterface): ReactElement {
  return <Button {...props} />;
}

export default ButtonContainer;
