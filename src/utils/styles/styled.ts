import styled, { CreateStyled } from '@emotion/styled';

interface ThemeType {
  [color: string]: string;
}

export const theme: ThemeType = {
  BLACK: '#000000',
  GREEN: '#3ECF5C',
  LIGHTGREY: '#E0E0E0',
  GREY: '#9E9E9E',
  DARKGREY: '#616161',
  DEEPGREY: '#434343',
  WHITE: '#FFFFFF',
  GOOGLE_GREY: '#f5f5f5',
  RED: '#cb2431',
};

export default styled as CreateStyled<ThemeType>;
