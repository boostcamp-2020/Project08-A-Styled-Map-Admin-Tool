import { useState } from 'react';

export interface MapThemeHookType {
  checkedThemeIndex: number;
  checkHandler: (index: number) => void;
}

function useMapTheme(): MapThemeHookType {
  const [checkedThemeIndex, setCheckedThemeIndex] = useState<number>(0);

  const checkHandler = (index: number) => {
    setCheckedThemeIndex(index);
  };

  return { checkedThemeIndex, checkHandler };
}

export default useMapTheme;
