import React from 'react';
import styled from '../../../utils/styles/styled';
import {
  ModalWrapper,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
} from './common';
import CloseIcon from '../../Icon/CloseIcon';

const Background = styled.div<{ isOpen: boolean }>`
  position: fixed;
  ${(props) => (props.isOpen ? '' : 'display: none')};
  width: 100vw;
  height: 100vh;

  top: 0px;
  left: 0px;

  background-color: #00000040;

  z-index: 20;
`;

const ExportModalWrapper = styled(ModalWrapper)<{
  isOpen: boolean;
}>`
  ${(props) => (props.isOpen ? '' : 'display:none;')}
`;

const ModalBody = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: hidden;
`;

const ModalContent = styled.article`
  padding: 1rem;
  width: 100%;
  height: 20%;
  overflow-y: scroll;
  word-break: break-all;
`;

function ExportModal({
  isOpen,
  onClose,
  content,
}: {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}): React.ReactElement {
  return (
    <>
      <Background isOpen={isOpen} onClick={onClose} />
      <ExportModalWrapper isOpen={isOpen}>
        <ModalHeader>
          <ModalTitle>JSON 내보내기</ModalTitle>
          <ModalCloseButton onClick={onClose}>
            <CloseIcon />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <h2>JSON 형식으로 내보내기</h2>
          <ModalContent>
            <pre>{content}</pre>
          </ModalContent>
        </ModalBody>
      </ExportModalWrapper>
    </>
  );
}

export default ExportModal;
