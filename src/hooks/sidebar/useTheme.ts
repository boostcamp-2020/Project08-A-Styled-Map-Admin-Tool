import { objType } from '../../store/common/type';
import useWholeStyle from '../../hooks/common/useWholeStyle';

interface UseThemeType {
  applyTheme: (theme: objType) => void;
}

interface UseThemeProps {
  clickHandler: () => void;
}

function useTheme({ clickHandler }: UseThemeProps): UseThemeType {
  const { changeStyle } = useWholeStyle();

  const applyTheme = (theme: objType) => {
    clickHandler();
    if (!theme) changeStyle({});
    else changeStyle(theme);
  };

  return {
    applyTheme,
  };
}

export default useTheme;
