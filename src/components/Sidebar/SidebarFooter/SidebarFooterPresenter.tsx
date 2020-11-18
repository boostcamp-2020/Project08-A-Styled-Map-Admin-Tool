import React from 'react';
import styled from '../../../utils/styles/styled';

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
`;

const Button = styled.button`
  position: relative;
  z-index: 10;
  width: 48%;
  background-color: #f6f8fa;
  border: none;
  border-radius: 5px;
  box-shadow: -10px 16px 40px -23px #000000;
  padding: 12px 0;
`;

function SidebarFooterPresenter(): React.ReactElement {
  return (
    <FooterWrapper>
      <Button>고급설정</Button>
      <Button>내보내기</Button>
    </FooterWrapper>
  );
}

export default SidebarFooterPresenter;
