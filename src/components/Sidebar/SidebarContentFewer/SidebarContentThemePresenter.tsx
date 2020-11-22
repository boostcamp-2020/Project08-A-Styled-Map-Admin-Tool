import React, { useState } from 'react';
import ThemeItemPresenter from './ThemeItemPresenter';
import styled from '../../../utils/styles/styled';
import data from '../../../utils/redering-data/sidebarThemeData';

const ThemeWrapper = styled.div`
  padding: 50px 8px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
`;

const List = styled.ul`
  width: 90%;
  margin: 0 auto;
  margin-top: 25px;
`;

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
