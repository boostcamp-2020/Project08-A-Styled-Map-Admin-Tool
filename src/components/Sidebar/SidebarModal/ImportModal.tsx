import React from 'react';
import styled from '../../../utils/styles/styled';
import useSidebarImportModal, {
  useModalStatusProps,
  useModalStatusType,
} from '../../../hooks/sidebar/useImportModalStatus';
import useInputText, {
  InputTextHookType,
} from '../../../hooks/common/useInputText';
import CloseIcon from '../../Icon/CloseIcon';
import useWholeStyle from '../../../hooks/common/useWholeStyle';
import { WholeStyleActionPayload } from '../../../store/common/type';

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

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 500px;
  height: 500px;

  transform: translate(-50%, -50%);
  border: 0;
  border-radius: 8px;
  background-color: ${(props) => props.theme.WHITE};
  box-shadow: 0 0 10px ${(props) => props.theme.GREY};
  z-index: 30;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  position: relative;
  display: flex;
  align-self: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px;
  height: 5rem;
`;

const ModalTitle = styled.h2`
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  flex: 0 0 content;
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

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 30px;
  height: 30px;
  padding: 5px 0;

  border-radius: 5px;
  background-color: ${(props) => props.theme.WHITE};
  text-align: center;
  border: none;

  &:hover {
    color: ${(props) => props.theme.GREEN};
  }
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
