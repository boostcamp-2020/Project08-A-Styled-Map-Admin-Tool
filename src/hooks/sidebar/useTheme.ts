import { objType, ReplaceType } from '../../store/common/type';
import useWholeStyle from '../../hooks/common/useWholeStyle';

interface UseThemeType {
  applyTheme: (theme: objType) => void;
}

interface UseThemeProps {
  clickHandler: () => void;
}

const standardTheme = '표준';

function useTheme({ clickHandler }: UseThemeProps): UseThemeType {
  const { changeStyle } = useWholeStyle();

  const applyTheme = (data: objType) => {
    clickHandler();
    if (!data.theme)
      changeStyle(
        {},
        { changedKey: ReplaceType.theme, changedValue: standardTheme }
      );
    else
      changeStyle(data.theme, {
        changedKey: ReplaceType.theme,
        changedValue: data.name,
      });
  };

  return {
    applyTheme,
  };
}

export default useTheme;
