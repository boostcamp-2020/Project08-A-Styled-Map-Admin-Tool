import { useSelector } from 'react-redux';
import { RootState } from '../store';

export interface LowerButtonsHookType {
  plusZoom: () => void;
  minusZoom: () => void;
}

function useLowerButtons(): LowerButtonsHookType {
  const map = useSelector((state: RootState) => state.map.map);

  const plusZoom = () => {
    const zoom = map?.getZoom() as number;
    map?.flyTo({ zoom: zoom + 1 });
  };

  const minusZoom = () => {
    const zoom = map?.getZoom() as number;
    map?.flyTo({ zoom: zoom - 1 });
  };

  return {
    plusZoom,
    minusZoom,
  };
}

export default useLowerButtons;
