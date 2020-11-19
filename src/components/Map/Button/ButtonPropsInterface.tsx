import { MouseEvent } from 'react';

export default interface ButtonProps {
  width?: string;
  height?: string;
  textContent?: string;
  // FIXME
  // onClick?: MouseEvent<HTMLElement>;
  onClick?: any;
}
