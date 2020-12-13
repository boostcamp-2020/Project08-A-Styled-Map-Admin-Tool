import { useState } from 'react';
import useExportStyle, { ExportStyleMarkersType } from './useExportStyle';

interface SidebarFooterHook {
  isOpen: boolean;
  onClickExport: () => void;
  onCloseModal: () => void;
  style: ExportStyleMarkersType;
}

function useSidebarFooter(): SidebarFooterHook {
  const [isOpen, setIsOpen] = useState(false);
  const [style, setStyle] = useState({});

  const { exportStyle } = useExportStyle();

  const onClickExport = () => {
    const data = exportStyle();
    setStyle(data);
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  return { isOpen, onClickExport, onCloseModal, style };
}

export default useSidebarFooter;
