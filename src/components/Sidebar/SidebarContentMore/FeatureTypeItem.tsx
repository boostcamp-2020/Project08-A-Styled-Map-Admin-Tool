import React from 'react';
import styled from '../../../utils/styles/styled';
import {
  FeaturesType,
  FeatureNameType,
  FeatureNameOneType,
} from '../../../utils/rendering-data/featureTypeData';
import useFeatureTypeItemHook from '../../../hooks/sidebar/useFeatureTypeItem';

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
  typeKey: FeatureNameType | FeatureNameOneType;
  typeName: string;
  features: FeaturesType[];
  sidebarSubTypeName: string;
  sidebarTypeClickHandler: (name: string) => void;
  sidebarSubTypeClickHandler: (name: string) => void;
}

function FeatureTypeItem({
  typeKey,
  typeName,
  features,
  sidebarSubTypeName,
  sidebarTypeClickHandler,
  sidebarSubTypeClickHandler,
}: FeatureTypeItemProps): React.ReactElement {
  const { featureList } = useFeatureTypeItemHook({ featureName: typeKey });

  return (
    <>
      <FeatureList
        isChecked={sidebarSubTypeName === 'all'}
        onClick={() => {
          sidebarTypeClickHandler(typeKey);
          sidebarSubTypeClickHandler('all');
        }}
      >
        {featureList.all?.isChanged ? <CheckTitle>✓</CheckTitle> : <></>}
        {typeName}
        <Pointer>{'>'}</Pointer>
      </FeatureList>
      {features?.map(({ key, name }) => (
        <SectionList
          key={key}
          isChecked={sidebarSubTypeName === key}
          onClick={() => {
            sidebarTypeClickHandler(typeKey);
            sidebarSubTypeClickHandler(key);
          }}
        >
          {featureList[key]?.isChanged ? <Check>✓</Check> : <></>}
          {name}
          <Pointer>{'>'}</Pointer>
        </SectionList>
      ))}
    </>
  );
}

export default FeatureTypeItem;
