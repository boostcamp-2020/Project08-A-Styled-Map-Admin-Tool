import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  ThemDepthState,
  setThemeProperties,
} from '../../store/depth-theme/action';

export interface MapThemeHookType {
  themeIdx?: number;
  checkHandler: (index: number) => void;
}

function useMapTheme(): MapThemeHookType {
  const { themeIdx } = useSelector<RootState>(
    (state) => state.depthTheme
  ) as ThemDepthState;

  const dispatch = useDispatch();

  const checkHandler = (index: number) => {
    dispatch(setThemeProperties({ themeIdx: index }));
  };

  return { themeIdx, checkHandler };
}

export default useMapTheme;
