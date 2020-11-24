import React from 'react';
import styled from '../../../utils/styles/styled';

import Button from './Button';
import PlusIcon from '../../Icon/AddIcon';
import MinusIcon from '../../Icon/RemoveIcon';
import useLowerButtons, {
  LowerButtonsHookType,
} from '../../../hooks/map/useLowerButtons';

const LowerButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  position: fixed;
  bottom: 88px;
  right: 10px;
  z-index: 10;
`;

function LowerButtons(): React.ReactElement {
  const { plusZoom, minusZoom }: LowerButtonsHookType = useLowerButtons();

  return (
    <LowerButtonsWrapper>
      <Button width="30x" height="30px" onClick={plusZoom}>
        <PlusIcon />
      </Button>
      <Button width="31px" height="31px" onClick={minusZoom}>
        <MinusIcon />
      </Button>
    </LowerButtonsWrapper>
  );
}

export default LowerButtons;
