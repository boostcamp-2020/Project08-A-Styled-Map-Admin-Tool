import React, { useRef, useEffect, useState } from 'react';
import styled from '../../../utils/styles/styled';

const Canvas = styled.canvas`
  position: relative;

  background-color: #eee;
`;

interface DrawRangeToCanvasProps {
  x?: number;
  y?: number;
}

interface AAAProps {
  value: string | number;
  onStyleChange: (key: string, value: string | number) => void;
}

function AAA({ value, onStyleChange }: AAAProps): React.ReactElement {
  const canvasRef = useRef(document.createElement('canvas'));
  const [foreRange, setForeRange] = useState(0);
  const [backRange, setBackRange] = useState(0);
  const [down, setDown] = useState(false);

  function getCursorPosition(event: React.MouseEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    return x;
  }

  const mouseDownHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const x = getCursorPosition(e);
    setDown(true);
    drawRangeToCanvas({ x });
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!down) return;

    const x = getCursorPosition(e);
    drawRangeToCanvas({ x });
  };

  const mouseUpHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDown(false);
    const { width } = canvasRef.current;
    const x = getCursorPosition(e);
    if (x < width / 2) {
      const a = Number(value) - (width / 2 - x) * foreRange;
      console.log((width / 2 - x) * foreRange, width / 2 - x, foreRange);
      onStyleChange('saturation', a);
    } else {
      const b = Number(value) + (x - width / 2) * backRange;
      onStyleChange('saturation', b);
    }
  };

  const drawRangeToCanvas = ({ x }: DrawRangeToCanvasProps) => {
    const ctx = canvasRef.current.getContext('2d');
    const { width, height } = canvasRef.current;

    if (!ctx) return;
    ctx?.clearRect(0, 0, width, height);

    ctx.fillStyle = 'darkgray';
    ctx.beginPath();
    ctx.rect(0, height / 2, width * 2, 2);
    ctx.fill();

    ctx.fillStyle = '#3ECF5C';
    ctx.beginPath();
    ctx.arc(x || width / 2, height / 2, 10, 0, Math.PI * 2);
    ctx.fill();
  };

  const setRange = () => {
    const { width } = canvasRef.current;
    setForeRange(width / 2 / (100 - Number(value)));
    setBackRange(width / 2 / Number(value));
  };

  useEffect(() => {
    setRange();
    drawRangeToCanvas({});
  }, []);

  return (
    <Canvas
      width="170"
      height="50"
      ref={canvasRef}
      onMouseDown={mouseDownHandler}
      onMouseMove={mouseMoveHandler}
      onMouseUp={mouseUpHandler}
    />
  );
}

export default AAA;
