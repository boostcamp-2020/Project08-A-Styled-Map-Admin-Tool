import React, { useState } from 'react';
import styled from '../../../utils/styles/styled';

interface ImageProp {
  src: string;
}

interface CheckedProp {
  checked: boolean;
}

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

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  cursor: pointer;
`;

const Image = styled.div<ImageProp>`
  background-image: url('${(props) => props.src}');
  background-size: cover;
  width: 25%;
  height: 50px;
`;

const Name = styled.span<CheckedProp>`
  width: 55%;
  font-size: 1.5rem;
  color: ${(props) => (props.checked ? props.theme.GREEN : 'gray')};
`;

const Checkbox = styled.div<CheckedProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${(props) =>
    props.checked ? props.theme.GREEN : 'lightgray'};
`;

const Circle = styled.div<CheckedProp>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${(props) => (props.checked ? 'white' : 'lightgray')};
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
          <Item key={d.name} onClick={() => clickHandler(i)}>
            <Image src={d.src} />
            <Name checked={i === checkedItemIndex}>{d.name}</Name>
            <Checkbox checked={i === checkedItemIndex}>
              <Circle checked={i === checkedItemIndex} />
            </Checkbox>
          </Item>
        ))}
      </List>
    </ThemeWrapper>
  );
}

export default SidebarContentThemePresenter;
