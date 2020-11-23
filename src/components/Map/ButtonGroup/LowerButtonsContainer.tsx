import React from 'react';
import LowerButtonsPresenter from './LowerButtonsPresenter';

interface LowerButtonContainerProps {
  plusZoom: () => void;
  minusZoom: () => void;
}

function LowerButtonsContainer({
  plusZoom,
  minusZoom,
}: LowerButtonContainerProps): React.ReactElement {
  return <LowerButtonsPresenter plusZoom={plusZoom} minusZoom={minusZoom} />;
}

export default LowerButtonsContainer;
