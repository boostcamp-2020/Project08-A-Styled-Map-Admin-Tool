import React from 'react';
import styled from '../../../utils/styles/styled';
import UndoIcon from '../../Icon/UndoIcon';
import MoreVertIcon from '../../Icon/MoreVertIcon';

const HeaderWrapper = styled.header`
  height: 5.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px 0 25px;
  background-color: ${(props) => props.theme.GREEN};
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  color: ${(props) => props.theme.WHITE};
  width: 60%;
`;

const Btns = styled.div`
  position: relative;
  flex: 0 0 content;
  display: flex;
  align-items: center;
  width: 40%;
  height: 100%;
`;

const UndoBtn = styled(UndoIcon)`
  margin: 0 0 0 auto;
  fill: ${(props) => props.theme.WHITE};
  cursor: pointer;

  &:hover {
    fill: ${(props) => props.theme.DARKGREY};
  }
`;

const DropdownBtn = styled(MoreVertIcon)`
  margin-left: 10px;
  fill: ${(props) => props.theme.WHITE};
  cursor: pointer;

  &:hover {
    fill: ${(props) => props.theme.DARKGREY};
  }
`;

interface SidebarHeaderPresenterProps {
  isAdvanced: boolean;
  onClickDropdown: () => void;
  children: React.ReactNode;
}

function SidebarHeaderPresenter({
  isAdvanced,
  onClickDropdown,
  children,
}: SidebarHeaderPresenterProps): React.ReactElement {
  return (
    <HeaderWrapper>
      <HeaderTitle>{isAdvanced ? '고급 설정' : '스타일 맵 만들기'}</HeaderTitle>
      <Btns>
        <UndoBtn />
        <DropdownBtn onClick={onClickDropdown} />
        {children}
      </Btns>
    </HeaderWrapper>
  );
}

export default SidebarHeaderPresenter;
