import React, { useState } from 'react';
import SidebarContentPresenter from './SidebarContentPresenter';
import StylerPresenter from './StylerPresenter';
import FeatureTypePresenter from './FeatureTypePresenter';
import DetailTypePresenter from './DetailTypePresenter';

function SidebarContentContainer(): React.ReactElement {
  const [featureName, setFeatureName] = useState('');
  const [detailName, setDetailName] = useState(''); // (구역 채우기) 이런 형태
  const [styledFeatureList, setStyledFeatureList] = useState([]); // 추후 전역 상태로 변경

  const featureClickHandler = (name: string) => {
    if (name !== featureName) {
      setFeatureName(name);
    }
  };
  const detailClickHandler = (name: string) => {
    if (name !== detailName) {
      setDetailName(name);
    }
  };

  return (
    <SidebarContentPresenter>
      <FeatureTypePresenter
        featureName={featureName}
        styledFeatureList={styledFeatureList}
        featureClickHandler={featureClickHandler}
      />
      <DetailTypePresenter
        featureName={featureName}
        detailName={detailName}
        detailClickHandler={detailClickHandler}
      />
      <StylerPresenter detailName={detailName} />
    </SidebarContentPresenter>
  );
}

export default SidebarContentContainer;
