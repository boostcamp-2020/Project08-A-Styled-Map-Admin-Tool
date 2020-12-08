import React from 'react';
import styled from '../../../utils/styles/styled';
import {
  ModalWrapper,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
} from './common';
import CloseIcon from '../../Icon/CloseIcon';
import Overlay from '../../common/Overlay';
import { FeatureNameType } from '../../../store/common/type';
import { jsonToURL } from '../../../utils/urlParsing';

const ExportModalWrapper = styled(ModalWrapper)<{
  isOpen: boolean;
}>`
  ${(props) => (props.isOpen ? '' : 'display:none;')}
`;

const ModalBody = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const ModalContent = styled.article`
  padding: 1rem;
  width: 100%;
  height: 20%;
  overflow-y: scroll;
  word-break: break-all;
`;

interface StoreDataType {
  [key: string]: FeatureNameType | undefined;
}

function ExportModal({
  isOpen,
  onClose,
  style,
}: {
  isOpen: boolean;
  onClose: () => void;
  style: StoreDataType;
}): React.ReactElement {
  return (
    <>
      {isOpen && <Overlay toggleHandler={onClose} color="black" />}
      <ExportModalWrapper isOpen={isOpen}>
        <ModalHeader>
          <ModalTitle>JSON 내보내기</ModalTitle>
          <ModalCloseButton onClick={onClose}>
            <CloseIcon />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <div>
            <h2>JSON 형식으로 내보내기</h2>
            <ModalContent>
              <pre>{JSON.stringify(style, null, 2)}</pre>
            </ModalContent>
          </div>
          <div>
            <h2>URL로 내보내기</h2>
            <ModalContent>
              <pre>{jsonToURL(style)}</pre>
            </ModalContent>
          </div>
        </ModalBody>
      </ExportModalWrapper>
    </>
  );
}

export default ExportModal;
