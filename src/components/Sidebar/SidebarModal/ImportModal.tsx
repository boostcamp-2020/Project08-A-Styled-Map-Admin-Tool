import React from 'react';
import styled from '../../../utils/styles/styled';
import useSidebarImportModal, {
  useModalStatusProps,
  useModalStatusType,
} from '../../../hooks/common/useModalStatus';
import useInputText, {
  InputTextHookType,
} from '../../../hooks/common/useInputText';
import CloseIcon from '../../Icon/CloseIcon';
import useWholeStyle from '../../../hooks/common/useWholeStyle';
import { WholeStyleActionPayload } from '../../../store/common/type';
import {
  ModalWrapper,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
} from './common';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.BLACK};
  opacity: 0.5;
  z-index: 20;
`;

const ModalInput = styled.textarea`
  width: 100%;
  height: 480px;
  padding: 10px;
  outline: none;
  border-left: none;
  border-right: none;
  background-color: ${(props) => props.theme.GOOGLE_GREY};
`;

const ModalOKButton = styled.button`
  background-color: transparent;
  padding: 20px 0;
  color: ${(props) => props.theme.GREEN};
  width: 100%;
  border: none;
  font-weight: 600;
  font-size: 1.6rem;

  &:hover {
    color: ${(props) => props.theme.WHITE};
    background-color: ${(props) => props.theme.GREEN};
  }
`;

function ImportModal({
  importModalToggleHandler,
}: useModalStatusProps): React.ReactElement {
  const { onClickClose, onClickOK }: useModalStatusType = useSidebarImportModal(
    {
      importModalToggleHandler,
    }
  );
  const { inputText, onInputChange }: InputTextHookType = useInputText();
  const { changeStyle } = useWholeStyle();

  return (
    <>
      <Overlay onClick={onClickClose} />
      <ModalWrapper>
        <ModalHeader>
          <ModalTitle>JSON 불러오기</ModalTitle>
          <ModalCloseButton onClick={onClickClose}>
            <CloseIcon />
          </ModalCloseButton>
        </ModalHeader>
        <ModalInput
          placeholder="JSON을 입력하세요"
          value={inputText}
          onChange={onInputChange}
        />
        <ModalOKButton onClick={onClickOK}>지도 가져오기</ModalOKButton>
        <button
          type="button"
          onClick={() => {
            changeStyle(JSON.parse(inputText) as WholeStyleActionPayload);
          }}
        >
          테스트
        </button>
      </ModalWrapper>
    </>
  );
}

export default ImportModal;
