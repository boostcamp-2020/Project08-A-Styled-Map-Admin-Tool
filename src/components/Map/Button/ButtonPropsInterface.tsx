import { MouseEvent } from 'react';

export default interface ButtonProps {
  width?: string;
  height?: string;
  textContent?: string;
  onClick?: (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
}
