export interface useModalStatusProps {
  importModalToggleHandler: (e: React.MouseEvent) => void;
}

export interface useModalStatusType {
  onClickClose: (e: React.MouseEvent) => void;
  onClickOK: (e: React.MouseEvent) => void;
}

function useModalStatus({
  importModalToggleHandler,
}: useModalStatusProps): useModalStatusType {
  const onClickClose = (e: React.MouseEvent) => {
    importModalToggleHandler(e);
  };

  const onClickOK = (e: React.MouseEvent) => {
    importModalToggleHandler(e);
  };

  return {
    onClickClose,
    onClickOK,
  };
}

export default useModalStatus;
