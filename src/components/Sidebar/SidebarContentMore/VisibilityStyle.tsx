import React from 'react';
import styled from '../../../utils/styles/styled';
import {
  VisibilityValueType,
  StyleDefaultKeyType,
  StyleKeyType,
} from '../../../store/common/type';

interface CheckedProp {
  checked: boolean;
}

const VisibilityWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const VisibilityTitle = styled.h2`
  font-size: 1.7rem;
  font-weight: 600;
  color: ${(props) => props.theme.GREY};
  margin: 10px 0;
`;

const VisibilityItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin: 5px 10px;
  cursor: pointer;
`;

const Checkbox = styled.div<CheckedProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: ${(props) =>
    props.checked ? props.theme.GREEN : 'lightgray'};
`;

const Circle = styled.div<CheckedProp>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.checked ? 'white' : 'lightgray')};
`;

interface VisibilityStyleProps {
  visibility: string;
  subFeature: string | null;
  onStyleChange: (key: StyleDefaultKeyType, value: string | number) => void;
}

function VisibilityStyle({
  visibility,
  onStyleChange,
  subFeature,
}: VisibilityStyleProps): React.ReactElement {
  const list = [
    { title: '상위요소 상속', value: 'inherit' },
    { title: '보임', value: 'visible' },
    { title: '숨김', value: 'none' },
  ];

  return (
    <VisibilityWrapper>
      <VisibilityTitle>가시성</VisibilityTitle>
      {list.map((item) => {
        if (subFeature === 'all' && item.value === VisibilityValueType.inherit)
          return null;
        return (
          <VisibilityItem
            key={item.value}
            onClick={() => {
              onStyleChange(StyleKeyType.visibility, item.value);
            }}
          >
            <Checkbox checked={visibility === item.value}>
              <Circle checked={visibility === item.value} />
            </Checkbox>
            {item.title}
          </VisibilityItem>
        );
      })}
    </VisibilityWrapper>
  );
}

export default VisibilityStyle;
