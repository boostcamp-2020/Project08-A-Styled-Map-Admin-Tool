import React, { useState, useEffect } from 'react';

interface UseInputRangeProps {
  range: string | number;
  onStyleChange: (key: string, value: string | number) => void;
}

interface InputRangeHookType {
  curRange: string | number;
  rangeChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rangeMouseUpHandler: (key: string) => void;
}

function useInputRange({
  range,
  onStyleChange,
}: UseInputRangeProps): InputRangeHookType {
  const [curRange, setCurRange] = useState<string | number>(range);

  useEffect(() => {
    setCurRange(range);
  }, [range]);

  const rangeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurRange(e.target.value);
  };

  const rangeMouseUpHandler = (key: string) => {
    onStyleChange(key, curRange);
  };

  return {
    curRange,
    rangeChangeHandler,
    rangeMouseUpHandler,
  };
}

export default useInputRange;
