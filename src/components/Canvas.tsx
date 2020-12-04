import React from 'react';
import styled from '../utils/styles/styled';
import useCanvas from '../hooks/useCanvas';

const Canvas = styled.canvas``;

const Img = styled.img`
  display: none;
`;

const CANVAS_WIDTH = 804;
const CANVAS_HEIGHT = 420;

function CanvasComponent(): React.ReactElement {
  const { mapImgRef, logoImgRef, canvasRef, mouseDownHandler } = useCanvas();

  return (
    <>
      <Img
        src="/images/map.png"
        alt="map"
        crossOrigin="anonymous"
        ref={mapImgRef}
      />
      <Img
        src="/images/logo.png"
        alt="logo"
        crossOrigin="anonymous"
        ref={logoImgRef}
      />
      <Canvas
        onMouseDown={mouseDownHandler}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        ref={canvasRef}
      />
    </>
  );
}

export default CanvasComponent;
