import React, { useState } from 'react';
import SidebarContentPresenter from './SidebarContentPresenter';
import FeatureTypePresenter from './FeatureTypePresenter';

function SidebarContentContainer(): React.ReactElement {
  const [featureName, setFeatureName] = useState('');
  const [styledFeatureList, setStyledFeatureList] = useState([]); // 추후 전역 상태로 변경

  const featureClickHandler = (name: string) => {
    if (name !== featureName) {
      setFeatureName(name);
    }
  };

  return (
    <SidebarContentPresenter>
      <FeatureTypePresenter
        featureName={featureName}
        styledFeatureList={styledFeatureList}
        featureClickHandler={featureClickHandler}
      />
    </SidebarContentPresenter>
  );
}

export default SidebarContentContainer;
