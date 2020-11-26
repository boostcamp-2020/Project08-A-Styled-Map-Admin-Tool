import React from 'react';
import useMapTheme, { MapThemeHookType } from '../../../hooks/map/useMapTheme';
import ThemeItem from './ThemeItem';
import styled from '../../../utils/styles/styled';
import data from '../../../utils/rendering-data/sidebarThemeData';

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

function SidebarContentTheme(): React.ReactElement {
  const { checkedThemeIndex, checkHandler }: MapThemeHookType = useMapTheme();

  return (
    <ThemeWrapper>
      <Title>지도 테마 선택</Title>
      <List>
        {data.map((d, i) => (
          <ThemeItem
            key={d.name}
            checked={i === checkedThemeIndex}
            clickHandler={() => checkHandler(i)}
            data={d}
          />
        ))}
      </List>
    </ThemeWrapper>
  );
}

export default SidebarContentTheme;
