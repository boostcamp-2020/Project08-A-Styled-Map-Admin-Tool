// Dependencies
import React, { useEffect } from 'react';
import styled from '../../../utils/styles/styled';
import CloseIcon from '../../Icon/CloseIcon';
import Copy from '../../Icon/Copy';
import Overlay from '../../common/Overlay';
import {
  ModalWrapper,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
} from './common';

// Hook
import {
  ExportType,
  getStringifyStyleObject,
  geturlParsedStyle,
} from '../../../hooks/sidebar/useExportStyle';
import useCopyToClipboard from '../../../hooks/sidebar/useCopyToClipboard';

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
  height: 55%;
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
  display: flex;
`;

const CopyBtn = styled(Copy)`
  margin: 0 10px;
`;

const CopyStatus = styled.div`
  color: black;
`;

function ExportModal({
  isOpen,
  onClose,
  style,
}: {
  isOpen: boolean;
  onClose: () => void;
  style: ExportType;
}): React.ReactElement {
  const {
    completeUrlCopy,
    completeJsonCopy,
    setCompleteUrlCopy,
    setCompleteJsonCopy,
    copyToClipboard,
  } = useCopyToClipboard();

  useEffect(() => {
    setCompleteJsonCopy(false);
    setCompleteUrlCopy(false);
  }, [style]);

  if (!isOpen) return <></>;

  const stringifiedStyleObject = getStringifyStyleObject(style);
  const urlParsedStyle = geturlParsedStyle(style);

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
            <SubTitle>
              JSON 형식으로 내보내기
              <CopyBtn
                onClick={() => {
                  copyToClipboard({ newJson: stringifiedStyleObject });
                }}
              />
              <CopyStatus>{completeJsonCopy ? '복사완료' : ''}</CopyStatus>
            </SubTitle>

            <Content>{stringifiedStyleObject}</Content>
          </ExportToJson>
          <ExportToURL>
            <SubTitle>
              URL로 내보내기
              <CopyBtn
                onClick={() => copyToClipboard({ newUrl: urlParsedStyle })}
              />
              <CopyStatus>{completeUrlCopy ? '복사완료' : ''}</CopyStatus>
            </SubTitle>
            <Content>{urlParsedStyle}</Content>
          </ExportToURL>
        </ModalBody>
      </ExportModalWrapper>
    </>
  );
}

export default ExportModal;
