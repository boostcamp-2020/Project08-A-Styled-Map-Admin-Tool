import React from 'react';
import styled from '../../../utils/styles/styled';
import useSidebarType, {
  SidebarHookType,
} from '../../../hooks/sidebar/useSidebarType';
import ListItem, { paddingStepType, paddingStep } from './DetailTypeItem';
import useDetailType from '../../../hooks/sidebar/useDetailType';
import Styler from './Styler';
import {
  FeatureNameType,
} from '../../../store/common/type';

interface PaddingProp {
  padding: paddingStepType;
}

const DetailWrapper = styled.div`
  width: 230px;
  height: 100%;
  padding: 20px;

  overflow-y: scroll;
  background-color: ${(props) => props.theme.WHITE};
  border-left: 1px solid ${(props) => props.theme.LIGHTGREY};
`;

const Title = styled.h2`
  padding-bottom: 40px;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
`;

const List = styled.ul`
  position: relative;
  margin-bottom: 30px;
`;

const Text = styled.h3<PaddingProp>`
  margin: 10px 0;
  padding-left: ${(props) => paddingStep[props.padding]};
  font-size: 1.7rem;
  font-weight: 600;
  color: ${(props) => props.theme.GREY};
`;

const Check = styled.div`
  position: absolute;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.GREEN};
`;

const CheckRight = styled.div`
  position: absolute;
  left: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.GREEN};
`;

interface DetailTypeProps {
  featureName: FeatureNameType;
  subFeatureName: string;
}

function DetailType({
  featureName,
  subFeatureName,
}: DetailTypeProps): React.ReactElement {
  const {
    sidebarTypeName,
    sidebarTypeClickHandler,
  }: SidebarHookType = useSidebarType();

  const {
    detail: { section, label },
  } = useDetailType({ featureName, subFeatureName });

  if (!featureName) {
    return <></>;
  }

  return (
    <>
      <DetailWrapper>
        <Title>세부 유형</Title>
        <List>
          <Text padding="first">구역</Text>
          {section?.fill.isChanged ? <Check>✓</Check> : <></>}
          <ListItem
            detailName={sidebarTypeName}
            padding="second"
            clickHandler={(name) => {
              return sidebarTypeClickHandler(name as FeatureNameType);
            }}
            name="채우기"
            parent="구역"
          />
          {section?.stroke.isChanged ? <Check>✓</Check> : <></>}
          <ListItem
            detailName={sidebarTypeName}
            padding="second"
            clickHandler={(name) => {
              sidebarTypeClickHandler(name as FeatureNameType);
            }}
            name="윤곽선"
            parent="구역"
          />
        </List>
        <List>
          <Text padding="first">라벨</Text>
          <List>
            <Text padding="second">텍스트</Text>
            {label?.text.fill.isChanged ? <CheckRight>✓</CheckRight> : <></>}
            <ListItem
              detailName={sidebarTypeName}
              padding="third"
              clickHandler={(name) => {
                sidebarTypeClickHandler(name as FeatureNameType);
              }}
              name="채우기"
              parent="텍스트"
            />
            {label?.text.stroke.isChanged ? <CheckRight>✓</CheckRight> : <></>}
            <ListItem
              detailName={sidebarTypeName}
              padding="third"
              clickHandler={(name) => {
                sidebarTypeClickHandler(name as FeatureNameType);
              }}
              name="윤곽선"
              parent="텍스트"
            />
          </List>
          {label?.icon.isChanged ? <Check>✓</Check> : <></>}
          <ListItem
            detailName={sidebarTypeName}
            padding="second"
            clickHandler={(name) => {
              sidebarTypeClickHandler(name as FeatureNameType);
            }}
            name="아이콘"
          />
        </List>
      </DetailWrapper>
      <Styler detailName={sidebarTypeName} />
    </>
  );
}

export default DetailType;
