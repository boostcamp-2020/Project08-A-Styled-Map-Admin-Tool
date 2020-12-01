/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/** 리팩토링 예정 */
import React, { useEffect, useRef, useState, RefObject } from 'react';

const X_PLUS = [0, 0, 1, -1, 1, -1, 1, -1];
const Y_PLUS = [1, -1, 0, 0, 1, -1, -1, 1];
const CANVAS_WIDTH = 804;
const CANVAS_HEIGHT = 420;
const PIXEL_UNIT = 5;
const RENDERING_COUNT = 200;
const MAP_OPTION = 'mapOption';
const LOGO_OPTION = 'logoOption';

interface useCanvasType {
  mapImgRef: RefObject<HTMLImageElement>;
  logoImgRef: RefObject<HTMLImageElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  mouseDownHandler: (e: React.MouseEvent<HTMLCanvasElement>) => void;
}

type OptionType = 'logoOption' | 'mapOption';
interface DotInterface {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
}

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

class Dot {
  mapOption: DotInterface;

  logoOption: DotInterface;

  currentOption: OptionType;

  constructor(mapOption: DotInterface, logoOption: DotInterface) {
    this.mapOption = mapOption;
    this.logoOption = logoOption;
    this.currentOption = LOGO_OPTION;
  }

  draw(c: CanvasRenderingContext2D) {
    const currentOption = this[this.currentOption];

    c.beginPath();
    c.fillStyle = `rgb(${currentOption.r}, ${currentOption.g}, ${currentOption.b})`;
    c.rect(currentOption.x, currentOption.y, 4, 4);
    // c.arc(currentOption.x, currentOption.y, 2, 0, 2 * Math.PI, false);
    c.fill();
  }
}

export default function useCanvas(): useCanvasType {
  const canvasRef = useRef(document.createElement('canvas'));
  const mapImgRef = useRef(document.createElement('img'));
  const logoImgRef = useRef(document.createElement('img'));

  const [dotsState, setDotsState] = useState<Array<Dot[]>>([]);
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [nextOption, setNextOption] = useState<OptionType>('mapOption');

  function drawCanvas(
    ctx: CanvasRenderingContext2D | undefined = context,
    dots = dotsState
  ) {
    if (ctx) {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      dots.forEach((dotRow) => {
        dotRow.forEach((dot: Dot) => {
          dot.draw(ctx);
        });
      });
    }
  }

  function parseImageToPixels(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement
  ) {
    const pixels = [];

    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(
      0,
      0,
      img.naturalWidth,
      img.naturalHeight
    ).data;

    for (let i = 0; i < imageData.length; i += 4) {
      const x = ((i / 4) % img.naturalWidth) + 1;
      const y = Math.floor(i / img.naturalWidth / 4) + 1;
      if (x % PIXEL_UNIT === 0 && y % PIXEL_UNIT === 0) {
        pixels.push({
          x,
          y,
          r: imageData[i],
          g: imageData[i + 1],
          b: imageData[i + 2],
        });
      }
    }

    return pixels;
  }

  async function initCanvas() {
    const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;

    await sleep(100);
    const logoPixels = parseImageToPixels(ctx, logoImgRef.current);
    const mapPixels = parseImageToPixels(ctx, mapImgRef.current);

    const dots = [];
    for (let i = 0; i < mapImgRef.current.naturalHeight / PIXEL_UNIT; i += 1) {
      const row = [];
      for (let j = 0; j < mapImgRef.current.naturalWidth / PIXEL_UNIT; j += 1) {
        const index = (mapImgRef.current.naturalWidth / PIXEL_UNIT) * i + j;
        const mapOption = mapPixels[index];
        const logoOption = logoPixels[index];

        if (!mapOption) break;
        const dot = new Dot(mapOption, logoOption);
        row.push(dot);
      }
      if (row.length) {
        dots.push(row);
      }
    }

    setContext(ctx);
    setDotsState(dots);
    drawCanvas(ctx, dots);
  }

  function getCursorPosition(event: React.MouseEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x, y };
  }

  async function changeCanvasOption(
    option: OptionType,
    point: { x: number; y: number }
  ) {
    const store: Array<number[]> = [[point.x, point.y]];
    let count = 0;

    while (store.length) {
      const [x, y] = store.shift() as number[];
      dotsState[x][y].currentOption = option;

      for (let i = 0; i < X_PLUS.length; i += 1) {
        const xx = x + X_PLUS[i];
        const yy = y + Y_PLUS[i];

        const maxPixelX = Math.floor(CANVAS_HEIGHT / PIXEL_UNIT) - 1;
        const maxPixelY = Math.floor(CANVAS_WIDTH / PIXEL_UNIT);
        if (xx >= maxPixelX || xx < 0 || yy >= maxPixelY || yy < 0) {
          continue;
        }

        if (dotsState[xx][yy].currentOption !== option) {
          const isExit = store.some((dot) => dot[0] === xx && dot[1] === yy);
          if (!isExit) {
            store.push([xx, yy]);
          }
        }
      }

      if (count === RENDERING_COUNT) {
        await sleep(1);
        count = 0;
        drawCanvas();
      }
      count += 1;
    }
  }

  const mouseDownHandler = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCursorPosition(e);
    /** 0부터 시작이라 1씩 빼줌, 좌표랑 배열이 반대라서 바꾸어서 넣어줌 */
    const coorX = parseInt(String(y / PIXEL_UNIT), 10) - 1;
    const coorY = parseInt(String(x / PIXEL_UNIT), 10) - 1;

    await changeCanvasOption(nextOption, { x: coorX, y: coorY });
    setNextOption(nextOption === MAP_OPTION ? LOGO_OPTION : MAP_OPTION);

    drawCanvas();
  };

  useEffect(() => {
    async function init() {
      await initCanvas();
    }
    init();
  }, []);

  return {
    mapImgRef,
    logoImgRef,
    canvasRef,
    mouseDownHandler,
  };
}
