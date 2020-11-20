import React from 'react';
import styled from '../../../utils/styles/styled';

type paddingStepType = 'first' | 'second' | 'third';
interface PaddingProp {
  padding: paddingStepType;
}
interface ItemProps extends PaddingProp {
  isSelected: boolean;
}

const paddingStep = {
  first: '0px',
  second: '15px',
  third: '30px',
};

const DetailWrapper = styled.div`
  width: 230px;
  height: 100%;
  padding: 20px;
  /* position: absolute;
  left: 5000px; */

  overflow-y: scroll;
  background-color: white;
  border-left: 1px solid lightgray;
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

const Item = styled.li<ItemProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding-left: ${(props) => paddingStep[props.padding]};
  font-size: 1.7rem;
  color: ${(props) =>
    props.isSelected ? props.theme.GREEN : props.theme.DARKGREY};
  cursor: pointer;

  &:hover {
    color: ${(props) =>
      props.isSelected ? props.theme.GREEN : props.theme.BLACK};
  }
`;

const Pointer = styled.span``;

interface DetailTypePresenterProps {
  featureName: string;
  detailName: string;
  detailClickHandler: (name: string) => void;
  children: React.ReactNode;
}

interface ListItemProps {
  detailName: string;
  padding: paddingStepType;
  clickHandler: (name: string) => void;
  name: string;
  parent?: string;
}

/** ListItem Component */
function ListItem({
  detailName,
  padding,
  clickHandler,
  name,
  parent,
}: ListItemProps): React.ReactElement {
  return (
    <Item
      isSelected={detailName === `${parent} ${name}`}
      padding={padding}
      onClick={() => {
        clickHandler(`${parent} ${name}`);
      }}
    >
      <span>{name}</span>
      <Pointer>{'>'}</Pointer>
    </Item>
  );
}

/** DetailTypePresenter Component */
function DetailTypePresenter({
  featureName,
  detailClickHandler,
  detailName,
  children,
}: DetailTypePresenterProps): React.ReactElement {
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
            detailName={detailName}
            padding="second"
            clickHandler={detailClickHandler}
            name="채우기"
            parent="구역"
          />
          <ListItem
            detailName={detailName}
            padding="second"
            clickHandler={detailClickHandler}
            name="윤곽선"
            parent="구역"
          />
        </List>
        <List>
          <Text padding="first">라벨</Text>
          <List>
            <Text padding="second">텍스트</Text>
            <ListItem
              detailName={detailName}
              padding="third"
              clickHandler={detailClickHandler}
              name="채우기"
              parent="텍스트"
            />
            <ListItem
              detailName={detailName}
              padding="third"
              clickHandler={detailClickHandler}
              name="윤곽선"
              parent="텍스트"
            />
          </List>
          <ListItem
            detailName={detailName}
            padding="second"
            clickHandler={detailClickHandler}
            name="아이콘"
          />
        </List>
      </DetailWrapper>
      {children}
    </>
  );
}

export default DetailTypePresenter;
