import React from 'react';
import styled from '../../../utils/styles/styled';
import data from '../../../utils/rendering-data/featureTypeData';

import DetailType from './DetailType';
import useSidebarType, {
  SidebarHookType,
} from '../../../hooks/sidebar/useSidebarType';
import { FeatureNameType } from '../../../store/common/type';

import FeatureTypeItem from './FeatureTypeItem';

interface WrapperProps {
  isFeatureName: string;
}

const FeatureTypeWrapper = styled.ul<WrapperProps>`
  width: ${(props) => (props.isFeatureName ? '250px' : '370px')};
  padding: 20px;
  overflow-y: scroll;
`;

const FeatureTypeTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  padding-bottom: 40px;
`;

function FeatureType(): React.ReactElement {
  const {
    sidebarTypeClickHandler,
    sidebarSubTypeClickHandler,
    sidebarTypeName,
    sidebarSubTypeName,
  }: SidebarHookType = useSidebarType();

  return (
    <>
      <FeatureTypeWrapper isFeatureName={sidebarTypeName}>
        <FeatureTypeTitle>기능 유형</FeatureTypeTitle>
        {data.map(({ typeKey, typeName, features }) => (
          <FeatureTypeItem
            key={typeKey}
            typeKey={typeKey}
            typeName={typeName}
            features={features}
            sidebarTypeName={sidebarTypeName}
            sidebarSubTypeName={sidebarSubTypeName}
            sidebarTypeClickHandler={sidebarTypeClickHandler}
            sidebarSubTypeClickHandler={sidebarSubTypeClickHandler}
          />
        ))}
      </FeatureTypeWrapper>
      <DetailType
        featureName={sidebarTypeName as FeatureNameType}
        subFeatureName={sidebarSubTypeName}
      />
    </>
  );
}

export default FeatureType;
