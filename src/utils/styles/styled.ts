import styled, { CreateStyled } from '@emotion/styled';

interface ThemeType {
  [color: string]: string;
}

export const theme: ThemeType = {
  BLACK: '#000000',
  GREEN: '#3ECF5C',
};

export default styled as CreateStyled<ThemeType>;
