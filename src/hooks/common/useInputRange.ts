import React, { useState, useEffect } from 'react';
import { StyleKeyType } from '../../store/common/type';

interface UseInputRangeProps {
  range: string | number;
  onStyleChange: (key: StyleKeyType, value: string | number) => void;
}

interface InputRangeHookType {
  curRange: string | number;
  rangeChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rangeMouseUpHandler: (key: StyleKeyType) => void;
  initStyle: (key: StyleKeyType) => void;
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
    const value = Number.isNaN(Number(e.target.value))
      ? e.target.value
      : Number(e.target.value);
    setCurRange(value);
  };

  const rangeMouseUpHandler = (key: StyleKeyType) => {
    onStyleChange(key, curRange === 'transparent' ? '#000000' : curRange);
  };

  const initStyle = (key: StyleKeyType) => {
    onStyleChange(key, 'init');
  };

  return {
    curRange,
    rangeChangeHandler,
    rangeMouseUpHandler,
    initStyle,
  };
}

export default useInputRange;
