import useMarkerRegister from './useMarkerRegister';
import { MarkerLngLatType } from './useMarkerFeature';

interface MarkerPopUpHookType {
  onClickButton: () => void;
}

interface MarkerPopUpPropsType {
  inputText: string;
  markerLngLat: MarkerLngLatType;
  resetMarkerPos: () => void;
}

function useMarkerPopUp({
  inputText,
  markerLngLat,
  resetMarkerPos,
}: MarkerPopUpPropsType): MarkerPopUpHookType {
  const { registerMarker } = useMarkerRegister();
  const onClickButton = () => {
    if (inputText.length > 10) return;
    registerMarker({ text: inputText, lngLat: markerLngLat });
    resetMarkerPos();
  };

  return {
    onClickButton,
  };
}

export default useMarkerPopUp;
