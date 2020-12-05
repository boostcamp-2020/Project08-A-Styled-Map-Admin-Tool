import React from 'react';

function ExportModal({
  isOpen,
  content,
}: {
  isOpen: boolean;
  content: string;
}): React.ReactElement {
  return <div>{content}</div>;
}

export default ExportModal;
