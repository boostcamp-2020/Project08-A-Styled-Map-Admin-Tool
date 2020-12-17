import React, { useState, useEffect } from 'react';
import { StyleDefaultKeyType } from '../../store/common/type';

interface UseInputRangeProps {
  range: string | number;
  onStyleChange: (key: StyleDefaultKeyType, value: string | number) => void;
}

interface InputRangeHookType {
  curRange: string | number;
  rangeChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rangeMouseUpHandler: (key: StyleDefaultKeyType) => void;
  initStyle: (key: StyleDefaultKeyType) => void;
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

  const rangeMouseUpHandler = (key: StyleDefaultKeyType) => {
    onStyleChange(key, curRange === 'transparent' ? '#000000' : curRange);
  };

  const initStyle = (key: StyleDefaultKeyType) => {
    onStyleChange(key, 'transparent');
  };

  return {
    curRange,
    rangeChangeHandler,
    rangeMouseUpHandler,
    initStyle,
  };
}

export default useInputRange;
