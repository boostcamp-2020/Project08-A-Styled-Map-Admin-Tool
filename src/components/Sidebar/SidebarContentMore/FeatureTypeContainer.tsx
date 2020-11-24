import React, { useState } from 'react';
import FeatureTypePresenter from './FeatureTypePresenter';
import DetailTypeContainer from './DetailTypeContainer';

function FeatureTypeContainer(): React.ReactElement {
  const [featureName, setFeatureName] = useState('');
  const [styledFeatureList, setStyledFeatureList] = useState([]); // 추후 전역 상태로 변경

  const featureClickHandler = (name: string) => {
    if (name !== featureName) {
      setFeatureName(name);
    }
  };
  return (
    <FeatureTypePresenter
      featureClickHandler={featureClickHandler}
      styledFeatureList={styledFeatureList}
      featureName={featureName}
    >
      <DetailTypeContainer featureName={featureName} />
    </FeatureTypePresenter>
  );
}

export default FeatureTypeContainer;
