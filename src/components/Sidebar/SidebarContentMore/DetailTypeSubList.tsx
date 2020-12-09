import React from 'react';
import styled from '../../../utils/styles/styled';
import ListItem, { paddingStepType, paddingStep } from './DetailTypeItem';
import {
  ElementNameType,
  SubElementNameType,
} from '../../../store/common/type';

interface PaddingProp {
  padding: paddingStepType;
}

export const List = styled.ul`
  position: relative;
  margin-bottom: 30px;
`;

export const Text = styled.h3<PaddingProp>`
  margin: 10px 0;
  padding-left: ${(props) => paddingStep[props.padding]};
  font-size: 1.7rem;
  font-weight: 600;
  color: ${(props) => props.theme.GREY};
`;

export const Check = styled.div`
  position: absolute;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.GREEN};
`;

interface ChildrenType {
  isChanged?: boolean;
  title: string;
  elementName?: string;
  subElementName?: string;
  childrenProps: ChildrenType[];
}

interface PropsType {
  title: string;
  checkIsSelected: (
    elementName: ElementNameType,
    subElementName?: SubElementNameType | undefined
  ) => boolean;
  styleClickHandler: (
    elementName: ElementNameType,
    subElementName?: SubElementNameType | undefined
  ) => void;
  childrenProps: ChildrenType[];
}

function DetailTypeSubList({
  title,
  checkIsSelected,
  styleClickHandler,
  childrenProps,
}: PropsType): React.ReactElement {
  const childComponent = childrenProps.map((child: ChildrenType) => {
    return child.childrenProps.length !== 0 ? (
      <div key={`${child.title}`}>
        <Text padding="second">{child.title}</Text>
        {child.childrenProps.map((innerChild: ChildrenType) => {
          return (
            <div key={innerChild.title}>
              {innerChild.isChanged ? <Check>✓</Check> : null}
              <ListItem
                isSelected={checkIsSelected(
                  innerChild.elementName as ElementNameType,
                  innerChild.subElementName as SubElementNameType
                )}
                padding="third"
                clickHandler={() => {
                  styleClickHandler(
                    innerChild.elementName as ElementNameType,
                    innerChild.subElementName as SubElementNameType
                  );
                }}
                name={innerChild.title}
              />
            </div>
          );
        })}
      </div>
    ) : (
      <div>
        {child.isChanged ? <Check>✓</Check> : null}
        <ListItem
          isSelected={checkIsSelected(
            child.elementName as ElementNameType,
            child.subElementName as SubElementNameType
          )}
          padding="second"
          clickHandler={() => {
            styleClickHandler(
              child.elementName as ElementNameType,
              child.subElementName as SubElementNameType
            );
          }}
          name={child.title}
        />
      </div>
    );
  });
  return (
    <List>
      <Text padding="first">{title}</Text>
      {childComponent}
    </List>
  );
}

export default DetailTypeSubList;
