import React from 'react';
import styled from '../../../utils/styles/styled';
import useInputText from '../../../hooks/common/useInputText';
import useMarkerPopUp from '../../../hooks/map/useMarkerPopUp';
import CloseIcon from '../../Icon/CloseIcon';

const LIMIT_LENGTH = 10;
interface WrapperProps {
  pos: {
    x: number | null;
    y: number | null;
  };
}
interface MarkerLngLatType {
  lng: number | null;
  lat: number | null;
}
export interface RegisterMarkerType {
  id?: string;
  text: string;
  lngLat?: MarkerLngLatType;
  instance?: mapboxgl.Marker;
}

const Wrapper = styled.div<WrapperProps>`
  position: relative;
  top: ${(props) => props.pos.y}px;
  left: ${(props) => props.pos.x}px;
  width: 110px;
  height: 120px;
  padding: 5px;
  background-color: ${(props) => props.theme.WHITE};
  border-radius: 4px;

  z-index: 1000;
  box-sizing: border-box;
  box-shadow: 0 0 1px 2px ${(props) => props.theme.GREY};
  font-weight: 600;
  color: ${(props) => props.theme.GREEN};
  text-align: center;
`;

const PopUpHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MarkerInput = styled.textarea`
  width: 100%;
  height: 50px;
`;

const OkButton = styled.button`
  color: ${(props) => props.theme.WHITE};
  background-color: ${(props) => props.theme.GREY};
  &:hover {
    background-color: ${(props) => props.theme.GREEN};
  }
  border-radius: 4px;
  border: none;
  padding-top: 2px;
  margin-top: 5px;
`;

const CloseIconTag = styled(CloseIcon)`
  cursor: pointer;
  height: 15px;
  width: 15px;
`;

interface MarkerPopUpProps {
  markerPosition: { x: number | null; y: number | null };
  resetMarkerPos: () => void;
  registerMarker: ({ id, text, lngLat }: RegisterMarkerType) => void;
}

function MarkerPopUp({
  markerPosition,
  resetMarkerPos,
  registerMarker,
}: MarkerPopUpProps): React.ReactElement {
  const { inputText, onInputChange } = useInputText();
  const { onClickButton } = useMarkerPopUp({
    inputText,
    resetMarkerPos,
    registerMarker,
  });
  if (markerPosition.x && markerPosition.y)
    return (
      <Wrapper
        pos={{ x: markerPosition.x, y: markerPosition.y }}
        className="popup"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <PopUpHeader>
            <p style={{ fontSize: '15px' }}>마커 등록</p>
            <CloseIconTag onClick={resetMarkerPos} />
          </PopUpHeader>
          <MarkerInput onChange={onInputChange} />
          {inputText.length > LIMIT_LENGTH ? (
            <div>10자 이하의 텍스트 입력만 가능합니다.</div>
          ) : (
            <OkButton type="button" onClick={onClickButton}>
              확인
            </OkButton>
          )}
        </div>
      </Wrapper>
    );
  return <></>;
}

export default MarkerPopUp;
