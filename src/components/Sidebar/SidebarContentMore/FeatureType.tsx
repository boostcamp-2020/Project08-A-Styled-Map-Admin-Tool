import React from 'react';
import styled from '../../../utils/styles/styled';
import data from '../../../utils/redering-data/featureTypeData';

import DetailType from './DetailType';
import useSidebarType, { SidebarHookType } from '../../../hooks/useSidebarType';

interface WrapperProps {
  isFeatureName: string;
}
interface ListProps {
  isChecked: boolean;
}

const FeatureTypeWrapper = styled.ul<WrapperProps>`
  width: ${(props) => (props.isFeatureName ? '250px' : '370px')};
  padding: 20px;
`;

const FeatureTypeTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  padding-bottom: 40px;
`;

const FeatureList = styled.li<ListProps>`
  width: 100%;
  display: flex;
  font-size: 1.8rem;
  font-weight: 600;
  padding: 10px 0;
  color: ${(props) => (props.isChecked ? props.theme.GREEN : props.theme.GREY)};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.BLACK};
  }
`;

const Pointer = styled.span`
  margin: 0 0 0 auto;
`;

function FeatureType(): React.ReactElement {
  const {
    sidebarTypeClickHandler,
    sidebarTypeName,
  }: SidebarHookType = useSidebarType();

  return (
    <>
      <FeatureTypeWrapper isFeatureName={sidebarTypeName}>
        <FeatureTypeTitle>기능 유형</FeatureTypeTitle>
        {data.map(({ key, name }) => (
          <FeatureList
            key={key}
            isChecked={sidebarTypeName === key}
            onClick={() => {
              sidebarTypeClickHandler(key);
            }}
          >
            {name}
            <Pointer>{'>'}</Pointer>
          </FeatureList>
        ))}
      </FeatureTypeWrapper>
      <DetailType featureName={sidebarTypeName} />
    </>
  );
}

export default FeatureType;
