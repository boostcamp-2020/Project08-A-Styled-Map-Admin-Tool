// Dependencies
import React from 'react';
import styled from '../../../utils/styles/styled';
import DetailTypeSubList from './DetailTypeSubList';
import Styler from './Styler';

// Hook
import useSidebarType, {
  SidebarHookType,
} from '../../../hooks/sidebar/useSidebarType';
import ListItem from './DetailTypeItem';
import useDetailType, {
  UseDetailHookType,
} from '../../../hooks/sidebar/useDetailType';

// Type
import {
  ElementNameType,
  SubElementNameType,
} from '../../../store/common/type';

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

const Check = styled.div`
  position: absolute;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.GREEN};
`;

function DetailType(): React.ReactElement {
  const {
    feature,
    element,
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
  });

  if (!feature) {
    return <></>;
  }

  return (
    <>
      <DetailWrapper>
        <Title>세부 유형</Title>
        {section ? (
          <DetailTypeSubList
            title="구역"
            checkIsSelected={checkIsSelected}
            styleClickHandler={styleClickHandler}
            childrenProps={[
              {
                isChanged: section?.fill.isChanged,
                elementName: ElementNameType.section,
                subElementName: SubElementNameType.fill,
                title: '채우기',
                childrenProps: [],
              },
              {
                isChanged: section?.stroke.isChanged,
                elementName: ElementNameType.section,
                subElementName: SubElementNameType.stroke,
                title: '윤곽선',
                childrenProps: [],
              },
            ]}
          />
        ) : null}
        {labelText ? (
          <DetailTypeSubList
            title="라벨"
            checkIsSelected={checkIsSelected}
            styleClickHandler={styleClickHandler}
            childrenProps={[
              {
                title: '텍스트',
                childrenProps: [
                  {
                    isChanged: labelText?.fill.isChanged,
                    title: '채우기',
                    elementName: ElementNameType.labelText,
                    subElementName: SubElementNameType.fill,
                    childrenProps: [],
                  },
                  {
                    isChanged: labelText?.stroke.isChanged,
                    title: '윤곽선',
                    elementName: ElementNameType.labelText,
                    subElementName: SubElementNameType.stroke,
                    childrenProps: [],
                  },
                ],
              },
            ]}
          />
        ) : null}
        {labelIcon ? (
          <List>
            {labelIcon.isChanged ? <Check>✓</Check> : <></>}
            <ListItem
              isSelected={checkIsSelected(ElementNameType.labelIcon)}
              padding="second"
              clickHandler={() => {
                styleClickHandler(ElementNameType.labelIcon);
              }}
              name="아이콘"
            />
          </List>
        ) : null}
      </DetailWrapper>
      {element ? <Styler /> : <></>}
    </>
  );
}

export default DetailType;
