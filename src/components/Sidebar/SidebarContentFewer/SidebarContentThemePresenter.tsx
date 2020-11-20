import React, { useState } from 'react';
import ThemeItemPresenter from './ThemeItemPresenter';
import styled from '../../../utils/styles/styled';

const ThemeWrapper = styled.div`
  padding: 50px 16px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
`;

const List = styled.ul`
  margin-top: 25px;
`;

const data = [
  {
    src:
      'https://i.pinimg.com/originals/8f/6d/97/8f6d971f3d086edaf6cee773991abb27.jpg',
    name: '표준',
  },
  {
    src:
      'https://i.pinimg.com/originals/8f/6d/97/8f6d971f3d086edaf6cee773991abb27.jpg',
    name: '실버',
  },
  {
    src:
      'https://i.pinimg.com/originals/8f/6d/97/8f6d971f3d086edaf6cee773991abb27.jpg',
    name: '레트로',
  },
  {
    src:
      'https://i.pinimg.com/originals/8f/6d/97/8f6d971f3d086edaf6cee773991abb27.jpg',
    name: '흑백',
  },
  {
    src:
      'https://i.pinimg.com/originals/8f/6d/97/8f6d971f3d086edaf6cee773991abb27.jpg',
    name: '밤',
  },
  {
    src:
      'https://i.pinimg.com/originals/8f/6d/97/8f6d971f3d086edaf6cee773991abb27.jpg',
    name: '가지색',
  },
];

function SidebarContentThemePresenter(): React.ReactElement {
  const [checkedItemIndex, setCheckedItemIndex] = useState(0);

  const clickHandler = (index: number) => {
    setCheckedItemIndex(index);
  };

  return (
    <ThemeWrapper>
      <Title>지도 테마 선택</Title>
      <List>
        {data.map((d, i) => (
          <ThemeItemPresenter
            key={d.name}
            checked={i === checkedItemIndex}
            clickHandler={() => clickHandler(i)}
            data={d}
          />
        ))}
      </List>
    </ThemeWrapper>
  );
}

export default SidebarContentThemePresenter;
