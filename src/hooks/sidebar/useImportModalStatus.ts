export interface useModalStatusProps {
  importModalToggleHandler: () => void;
}

export interface useModalStatusType {
  onClickClose: () => void;
  onClickOK: () => void;
}

function useModalStatus({
  importModalToggleHandler,
}: useModalStatusProps): useModalStatusType {
  const onClickClose = () => {
    importModalToggleHandler();
  };

  const onClickOK = () => {
    importModalToggleHandler();
  };

  return {
    inputStatus,
    onClickClose,
    onClickOK,
  };
}

export default useModalStatus;
