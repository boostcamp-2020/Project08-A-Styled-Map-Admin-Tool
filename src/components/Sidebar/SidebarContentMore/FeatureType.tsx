// Dependencies
import React from 'react';
import styled from '../../../utils/styles/styled';
import FeatureTypeItem from './FeatureTypeItem';
import DetailType from './DetailType';

// Data
import data from '../../../utils/rendering-data/featureTypeData';

// Type
import useSidebarType, {
  SidebarHookType,
} from '../../../hooks/sidebar/useSidebarType';

interface WrapperProps {
  isFeatureName: string | null;
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
    feature,
    sidebarTypeClickHandler,
    sidebarSubTypeClickHandler,
  }: SidebarHookType = useSidebarType();

  return (
    <>
      <FeatureTypeWrapper isFeatureName={feature}>
        <FeatureTypeTitle>기능 유형</FeatureTypeTitle>
        {data.map(({ typeKey, typeName, subFeatures }) => (
          <FeatureTypeItem
            key={typeKey}
            typeKey={typeKey}
            typeName={typeName}
            subFeatures={subFeatures}
            sidebarTypeClickHandler={sidebarTypeClickHandler}
            sidebarSubTypeClickHandler={sidebarSubTypeClickHandler}
          />
        ))}
      </FeatureTypeWrapper>
      <DetailType />
    </>
  );
}

export default FeatureType;
