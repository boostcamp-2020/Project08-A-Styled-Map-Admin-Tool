// Dependencies
import React from 'react';
import styled from '../../../utils/styles/styled';
import useFeatureTypeItemHook from '../../../hooks/sidebar/useFeatureTypeItem';

// Data
import { FeaturesType } from '../../../utils/rendering-data/featureTypeData';

// Type
import { FeatureNameType, ElementNameType } from '../../../store/common/type';

interface ListProps {
  isChecked: boolean;
}

const FeatureList = styled.li<ListProps>`
  position: relative;
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
  position: relative;
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

const CheckTitle = styled.div`
  position: absolute;
  left: -14px;
  color: ${(props) => props.theme.GREEN};
`;

const Check = styled.div`
  position: absolute;
  left: -7px;
  color: ${(props) => props.theme.GREEN};
`;

const Pointer = styled.span`
  margin: 0 0 0 auto;
`;

interface FeatureTypeItemProps {
  typeKey: FeatureNameType;
  typeName: string;
  subFeatures: FeaturesType[];
  sidebarTypeClickHandler: (name: FeatureNameType | ElementNameType) => void;
  sidebarSubTypeClickHandler: (name: string) => void;
}

function FeatureTypeItem({
  typeKey,
  typeName,
  subFeatures,
  sidebarTypeClickHandler,
  sidebarSubTypeClickHandler,
}: FeatureTypeItemProps): React.ReactElement {
  const { featureList, feature, subFeature } = useFeatureTypeItemHook({
    featureName: typeKey,
  });

  return (
    <>
      <FeatureList
        isChecked={feature === typeKey && subFeature === 'all'}
        onClick={() => {
          sidebarTypeClickHandler(typeKey);
          sidebarSubTypeClickHandler('all');
        }}
      >
        {featureList.all?.isChanged ? <CheckTitle>✓</CheckTitle> : <></>}
        {typeName}
        <Pointer>{'>'}</Pointer>
      </FeatureList>
      {subFeatures.map(({ key, name }) => (
        <SectionList
          key={key}
          isChecked={subFeature === key}
          onClick={() => {
            sidebarTypeClickHandler(typeKey);
            sidebarSubTypeClickHandler(key);
          }}
        >
          {featureList[key]?.isChanged && <Check>✓</Check>}
          {name}
          <Pointer>{'>'}</Pointer>
        </SectionList>
      ))}
    </>
  );
}

export default FeatureTypeItem;
