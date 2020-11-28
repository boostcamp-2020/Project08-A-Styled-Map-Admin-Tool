import React from 'react';
import styled from '../../../utils/styles/styled';
import useSidebarType, {
  SidebarHookType,
} from '../../../hooks/sidebar/useSidebarType';
import ListItem, { paddingStepType, paddingStep } from './DetailTypeItem';
import useDetailType, {
  UseDetailHookType,
} from '../../../hooks/sidebar/useDetailType';
import Styler from './Styler';
import {
  FeatureNameType,
  ElementNameType,
  SubElementNameType,
} from '../../../store/common/type';

interface PaddingProp {
  padding: paddingStepType;
}

const DetailWrapper = styled.div`
  width: 230px;
  height: 100%;
  padding: 20px;

  overflow-y: scroll;
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
    sidebarSubTypeName,
    sidebarTypeClickHandler,
    sidebarSubTypeClickHandler,
  }: SidebarHookType = useSidebarType();

  const {
    detail: { section, labelText, labelIcon },
    styleClickHandler,
    checkIsSelected,
  }: UseDetailHookType = useDetailType({
    sidebarTypeClickHandler,
    sidebarSubTypeClickHandler,
    sidebarTypeName,
    sidebarSubTypeName,
    featureName,
    subFeatureName,
  });

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
            isSelected={checkIsSelected('section', 'fill')}
            padding="second"
            clickHandler={() => styleClickHandler('section', 'fill')}
            name="채우기"
          />
          {section?.stroke.isChanged ? <Check>✓</Check> : <></>}
          <ListItem
            isSelected={
              sidebarTypeName === 'section' && sidebarSubTypeName === 'stroke'
            }
            padding="second"
            clickHandler={() => styleClickHandler('section', 'stroke')}
            name="윤곽선"
          />
        </List>
        <List>
          <Text padding="first">라벨</Text>
          <List>
            <Text padding="second">텍스트</Text>
            {labelText.fill.isChanged ? <CheckRight>✓</CheckRight> : <></>}
            <ListItem
              isSelected={checkIsSelected('labelText', 'fill')}
              padding="third"
              clickHandler={() => styleClickHandler('labelText', 'fill')}
              name="채우기"
            />
            {labelText.stroke.isChanged ? <CheckRight>✓</CheckRight> : <></>}
            <ListItem
              isSelected={checkIsSelected('labelText', 'stroke')}
              padding="third"
              clickHandler={() => styleClickHandler('labelText', 'stroke')}
              name="윤곽선"
            />
          </List>
          {labelIcon.isChanged ? <Check>✓</Check> : <></>}
          <ListItem
            isSelected={checkIsSelected('labelIcon')}
            padding="second"
            clickHandler={() => styleClickHandler('labelIcon')}
            name="아이콘"
          />
        </List>
      </DetailWrapper>
      <Styler
        featureName={featureName}
        subFeatureName={subFeatureName}
        detailName={sidebarTypeName as ElementNameType}
        subDetailName={sidebarSubTypeName as SubElementNameType}
      />
    </>
  );
}

export default DetailType;
