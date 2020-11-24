import { useState } from 'react';

export interface SidebarHookType {
  sidebarTypeClickHandler: (name: string) => void;
  sidebarTypeName: string;
}

function useSidebarType(): SidebarHookType {
  const [sidebarTypeName, setSidebarTypeName] = useState<string>('');

  const sidebarTypeClickHandler = (name: string) => {
    if (name !== sidebarTypeName) {
      setSidebarTypeName(name);
    }
  };

  return {
    sidebarTypeClickHandler,
    sidebarTypeName,
  };
}

export default useSidebarType;
