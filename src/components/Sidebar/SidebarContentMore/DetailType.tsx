import React from 'react';
import styled from '../../../utils/styles/styled';
import SidebarTypeHook, {
  SidebarHookType,
} from '../../../hooks/useSidebarType';
import ListItem, { paddingStepType, paddingStep } from './DetailTypeItem';
import Styler from './Styler';

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
  margin-bottom: 30px;
`;

const Text = styled.h3<PaddingProp>`
  margin: 10px 0;
  padding-left: ${(props) => paddingStep[props.padding]};
  font-size: 1.7rem;
  font-weight: 600;
  color: ${(props) => props.theme.GREY};
`;

interface DetailTypeProps {
  featureName: string;
}

function DetailType({ featureName }: DetailTypeProps): React.ReactElement {
  const {
    sidebarTypeName,
    sidebarTypeClickHandler,
  }: SidebarHookType = SidebarTypeHook();

  if (!featureName) {
    return <></>;
  }

  return (
    <>
      <DetailWrapper>
        <Title>세부 유형</Title>
        <List>
          <Text padding="first">구역</Text>
          <ListItem
            detailName={sidebarTypeName}
            padding="second"
            clickHandler={sidebarTypeClickHandler}
            name="채우기"
            parent="구역"
          />
          <ListItem
            detailName={sidebarTypeName}
            padding="second"
            clickHandler={sidebarTypeClickHandler}
            name="윤곽선"
            parent="구역"
          />
        </List>
        <List>
          <Text padding="first">라벨</Text>
          <List>
            <Text padding="second">텍스트</Text>
            <ListItem
              detailName={sidebarTypeName}
              padding="third"
              clickHandler={sidebarTypeClickHandler}
              name="채우기"
              parent="텍스트"
            />
            <ListItem
              detailName={sidebarTypeName}
              padding="third"
              clickHandler={sidebarTypeClickHandler}
              name="윤곽선"
              parent="텍스트"
            />
          </List>
          <ListItem
            detailName={sidebarTypeName}
            padding="second"
            clickHandler={sidebarTypeClickHandler}
            name="아이콘"
          />
        </List>
      </DetailWrapper>
      <Styler detailName={sidebarTypeName} />
    </>
  );
}

export default DetailType;
