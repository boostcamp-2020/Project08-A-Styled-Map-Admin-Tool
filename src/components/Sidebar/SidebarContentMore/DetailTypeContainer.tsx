import React, { useState } from 'react';
import DetailTypePresenter from './DetailTypePresenter';
import StylerPresenter from './StylerPresenter';

interface DetailTypeContainerProps {
  featureName: string;
}

function DetailTypeContainer({
  featureName,
}: DetailTypeContainerProps): React.ReactElement {
  const [detailName, setDetailName] = useState(''); // (구역 채우기) 이런 형태
  const detailClickHandler = (name: string) => {
    if (name !== detailName) {
      setDetailName(name);
    }
  };

  return (
    <DetailTypePresenter
      featureName={featureName}
      detailClickHandler={detailClickHandler}
      detailName={detailName}
    >
      <StylerPresenter detailName={detailName} />
    </DetailTypePresenter>
  );
}

export default DetailTypeContainer;
