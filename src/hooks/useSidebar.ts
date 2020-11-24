import { useState, Dispatch, SetStateAction } from 'react';

export interface useSidebarType {
  isAdvanced: boolean;
  setIsAdvanced: Dispatch<SetStateAction<boolean>>;
}

function useSidebar(): useSidebarType {
  const [isAdvanced, setIsAdvanced] = useState(false);

  return {
    isAdvanced,
    setIsAdvanced,
  };
}

export default useSidebar;
