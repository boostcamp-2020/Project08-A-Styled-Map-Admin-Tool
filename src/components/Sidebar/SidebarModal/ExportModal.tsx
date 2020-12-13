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
import useClipboard from '../../../hooks/common/useClipboard';

const ExportModalWrapper = styled(ModalWrapper)``;

const ModalBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.article`
  font-size: 1.3rem;
  overflow-y: scroll;
  height: 70%;
  word-break: break-all;
  white-space: normal;
  color: ${(props) => props.theme.GREY};
  line-height: 16px;
  background-color: ${(props) => props.theme.GOOGLE_GREY};
  padding: 10px;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none !important;
  }
`;

const ExportToJson = styled.div`
  padding: 0px 30px;
  height: 50%;
`;

const ExportToURL = styled.div`
  padding: 0px 30px;
  height: 50%;
`;

const SubTitle = styled.h2`
  padding: 10px 0;
  font-size: 1.6rem;
  color: ${(props) => props.theme.GREEN};
`;

const CopyButton = styled.button``;

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
  const { copyToClipboard } = useClipboard();

  if (!isOpen) return <></>;
  return (
    <>
      <Overlay toggleHandler={onClose} color="black" />
      <ExportModalWrapper>
        <ModalHeader>
          <ModalTitle>스타일 내보내기</ModalTitle>
          <ModalCloseButton onClick={onClose}>
            <CloseIcon />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <ExportToJson>
            <SubTitle>JSON 형식으로 내보내기</SubTitle>
            <Content>{JSON.stringify(style.filteredStyle, null, 2)}</Content>
            <CopyButton
              onClick={() => {
                copyToClipboard(JSON.stringify(style.filteredStyle, null, 2));
              }}
            >
              복사하기
            </CopyButton>
          </ExportToJson>
          <ExportToURL>
            <SubTitle>URL로 내보내기</SubTitle>
            <Content>{jsonToURL(style)}</Content>
            <CopyButton onClick={() => copyToClipboard(jsonToURL(style))}>
              복사하기
            </CopyButton>
          </ExportToURL>
        </ModalBody>
      </ExportModalWrapper>
    </>
  );
}

export default ExportModal;
