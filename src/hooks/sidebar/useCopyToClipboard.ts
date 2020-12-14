import { useState, useEffect } from 'react';

interface CopyToClipboardType {
  url: string;
  json: string;
  completeUrlCopy: boolean;
  completeJsonCopy: boolean;
  updateUrl: (newUrl: string) => void;
  updateJson: (newJson: string) => void;
  setCompleteUrlCopy: (newCompleteCopy: boolean) => void;
  setCompleteJsonCopy: (newCompleteCopy: boolean) => void;
  copyToClipboard: ({ newJson, newUrl }: CopyButtonProps) => void;
}

interface CopyButtonProps {
  newJson?: string;
  newUrl?: string;
}

function useCopyToClipboard(): CopyToClipboardType {
  const [url, setUrl] = useState('');
  const [json, setJson] = useState('');
  const [completeUrlCopy, setCompleteUrlCopy] = useState(false);
  const [completeJsonCopy, setCompleteJsonCopy] = useState(false);
  const updateUrl = (newUrl: string) => {
    setUrl(newUrl);
  };
  const updateJson = (newJson: string) => {
    setJson(newJson);
  };

  const copyToClipboard = ({ newUrl, newJson }: CopyButtonProps) => {
    if (newUrl) updateUrl(newUrl);
    if (newJson) updateJson(newJson);

    const textareaEl = document.createElement('textarea');
    textareaEl.value = (newUrl as string) || (newJson as string);
    textareaEl.setAttribute('readonly', '');
    textareaEl.style.position = 'absolute';
    textareaEl.style.left = '-9999px';
    document.body.appendChild(textareaEl);
    textareaEl.select();

    const returnValue = document.execCommand('copy');
    document.body.removeChild(textareaEl);

    if (!returnValue) return;
    if (returnValue && newJson) setCompleteJsonCopy(true);
    if (returnValue && newUrl) setCompleteUrlCopy(true);
  };

  return {
    url,
    json,
    completeUrlCopy,
    completeJsonCopy,
    updateUrl,
    updateJson,
    setCompleteUrlCopy,
    setCompleteJsonCopy,
    copyToClipboard,
  };
}

export default useCopyToClipboard;
