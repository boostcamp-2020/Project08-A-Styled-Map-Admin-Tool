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
  overflow-y: scroll;
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
  color: ${(props) =>
    props.isChecked ? props.theme.GREEN : props.theme.DARKGREY};
  cursor: pointer;

  &:hover {
    color: ${(props) =>
      props.isChecked ? props.theme.GREEN : props.theme.BLACK};
  }
`;

const SectionList = styled.div<ListProps>`
  width: 100%;
  display: flex;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 10px 0 10px 10px;
  color: ${(props) => (props.isChecked ? props.theme.GREEN : props.theme.GREY)};
  cursor: pointer;

  &:hover {
    color: ${(props) =>
      props.isChecked ? props.theme.GREEN : props.theme.BLACK};
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
        {data.map(({ typeKey, typeName, section }) => (
          <div key={typeKey}>
            <FeatureList
              isChecked={sidebarTypeName === typeKey}
              onClick={() => {
                sidebarTypeClickHandler(typeKey);
              }}
            >
              {typeName}
              <Pointer>{'>'}</Pointer>
            </FeatureList>
            {section?.map(({ key, name }) => (
              <SectionList
                key={key}
                isChecked={sidebarTypeName === key}
                onClick={() => {
                  sidebarTypeClickHandler(key);
                }}
              >
                {name}
                <Pointer>{'>'}</Pointer>
              </SectionList>
            ))}
          </div>
        ))}
      </FeatureTypeWrapper>
      <DetailType featureName={sidebarTypeName} />
    </>
  );
}

export default FeatureType;
