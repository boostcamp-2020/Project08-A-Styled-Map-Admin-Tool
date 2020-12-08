import React, { Dispatch, SetStateAction } from 'react';
import useSidebarFooter from '../../../hooks/sidebar/useSidebarFooter';
import styled from '../../../utils/styles/styled';
import ExportModal from '../SidebarModal/ExportModal';

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
  background-color: ${(props) => props.theme.WHITE};
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

interface SidebarFooterProps {
  isAdvanced: boolean;
  setIsAdvanced: Dispatch<SetStateAction<boolean>>;
}

function SidebarFooter({
  isAdvanced,
  setIsAdvanced,
}: SidebarFooterProps): React.ReactElement {
  const { isOpen, onClickExport, onCloseModal, style } = useSidebarFooter();

  return (
    <FooterWrapper>
      <Button onClick={() => setIsAdvanced(!isAdvanced)}>
        {isAdvanced ? '돌아가기' : '고급설정'}
      </Button>
      <Button onClick={onClickExport}>내보내기</Button>
      <ExportModal isOpen={isOpen} onClose={onCloseModal} style={style} />
    </FooterWrapper>
  );
}

export default SidebarFooter;
