import { useState, Dispatch, SetStateAction } from 'react';

export interface ToggleStatusHook {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

function useToggleStatus(): ToggleStatusHook {
  const [isActive, setIsActive] = useState<boolean>(false);

  return {
    isActive,
    setIsActive,
  };
}

export default useToggleStatus;
