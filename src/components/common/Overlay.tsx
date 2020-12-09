import React, { useState } from 'react';
import styled from '../../utils/styles/styled';

interface OverlayProps {
  color?: string;
  toggleHandler: () => void;
}

interface OverlayDivProps {
  color?: string;
}

const OverlayDiv = styled.div<OverlayDivProps>`
  position: fixed;
  top: -100vh;
  left: -100vw;
  width: 200vw;
  height: 200vh;

  background-color: ${(props) => (props.color ? props.color : 'transparent')};
  opacity: 0.6;
`;

function Overlay({ color, toggleHandler }: OverlayProps): React.ReactElement {
  const [open, setOpen] = useState(true);

  const clickHandler = () => {
    toggleHandler();
    setOpen(false);
  };

  if (!open) return <></>;
  return <OverlayDiv color={color} onClick={clickHandler} />;
}

export default Overlay;
