import React from 'react';
import styled from '../../../utils/styles/styled';

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  box-shadow: -15px 5px 40px -25px ${(props) => props.theme.BLACK};
`;

const Button = styled.button`
  position: relative;
  z-index: 10;
  width: 100px;
  background-color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 0;
  font-size: 1.5em;
  font-weight: 600;
  color: ${(props) => props.theme.GREEN};

  &:hover {
    color: ${(props) => props.theme.BLACK};
  }
`;

interface SidebarFooterPresenterProps {
  isAdvanced: boolean;
  clickHandler: () => void;
}

function SidebarFooterPresenter({
  isAdvanced,
  clickHandler,
}: SidebarFooterPresenterProps): React.ReactElement {
  return (
    <FooterWrapper>
      <Button onClick={clickHandler}>
        {isAdvanced ? '돌아가기' : '고급설정'}
      </Button>
      <Button>내보내기</Button>
    </FooterWrapper>
  );
}

export default SidebarFooterPresenter;
