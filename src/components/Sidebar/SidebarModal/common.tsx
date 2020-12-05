import styled from '../../../utils/styles/styled';

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

export { ModalWrapper, ModalHeader, ModalTitle, ModalCloseButton };
