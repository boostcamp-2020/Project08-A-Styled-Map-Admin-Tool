import React from 'react';
import SidebarContentPresenter from './SidebarContentPresenter';
import FeatureTypeContainer from './FeatureTypeContainer';

function SidebarContentContainer(): React.ReactElement {
  return (
    <SidebarContentPresenter>
      <FeatureTypeContainer />
    </SidebarContentPresenter>
  );
}

export default SidebarContentContainer;
