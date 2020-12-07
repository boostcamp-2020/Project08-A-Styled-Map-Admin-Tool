import mapboxgl from 'mapbox-gl';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setWholeStyle } from '../../store/style/action';
import { WholeStyleActionPayload } from '../../store/common/type';
import * as mapStyling from '../../utils/map-styling';

interface WholeStyleHook {
  changeStyle: (inputStyle: WholeStyleActionPayload) => void;
}

function useWholeStyle(): WholeStyleHook {
  const dispatch = useDispatch();

  const map = useSelector<RootState>((state) => state.map.map) as mapboxgl.Map;

  const changeStyle = (inputStyle: WholeStyleActionPayload): void => {
    dispatch(setWholeStyle(inputStyle));
  };

  return {
    changeStyle,
  };
}

export default useWholeStyle;
