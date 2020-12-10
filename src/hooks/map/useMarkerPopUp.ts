import { RegisterMarkerType } from './useMarkerFeature';

interface MarkerPopUpHookType {
  onClickButton: () => void;
}

interface MarkerPopUpPropsType {
  inputText: string;
  registerMarker: ({ id, text, lngLat }: RegisterMarkerType) => void;
  resetMarkerPos: () => void;
}

function useMarkerPopUp({
  inputText,
  registerMarker,
  resetMarkerPos,
}: MarkerPopUpPropsType): MarkerPopUpHookType {
  const onClickButton = () => {
    if (inputText.length > 10) return;
    registerMarker({ text: inputText });
    resetMarkerPos();
  };

  return {
    onClickButton,
  };
}

export default useMarkerPopUp;
