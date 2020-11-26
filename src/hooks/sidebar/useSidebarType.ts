import { useState } from 'react';

export interface SidebarHookType {
  sidebarTypeClickHandler: (name: string) => void;
  sidebarSubTypeClickHandler: (name: string) => void;
  sidebarTypeName: string;
  sidebarSubTypeName: string;
}

function useSidebarType(): SidebarHookType {
  const [sidebarTypeName, setSidebarTypeName] = useState<string>('');
  const [sidebarSubTypeName, setSidebarSubTypeName] = useState<string>('');

  const sidebarTypeClickHandler = (name: string) => {
    if (name !== sidebarTypeName) {
      setSidebarTypeName(name);
    }
  };

  const sidebarSubTypeClickHandler = (name: string) => {
    if (name !== sidebarSubTypeName) {
      setSidebarSubTypeName(name);
    }
  };

  return {
    sidebarTypeClickHandler,
    sidebarSubTypeClickHandler,
    sidebarTypeName,
    sidebarSubTypeName,
  };
}

export default useSidebarType;
