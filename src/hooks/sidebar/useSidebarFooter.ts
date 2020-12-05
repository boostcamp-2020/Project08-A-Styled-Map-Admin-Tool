import { useState } from 'react';
import useExportStyle from './useExportStyle';

function useSidebarFooter() {
  const [isOpen, setIsOpen] = useState(false);
  const [stringifiedStyle, setStringifiedStyle] = useState('');

  const { exportStyle } = useExportStyle();

  const data = exportStyle();

  const onClickExport = () => {
    setStringifiedStyle(data);
    setIsOpen(true);
  };

  return { isOpen, stringifiedStyle, onClickExport, data };
}

export default useSidebarFooter;
