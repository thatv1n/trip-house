import facepaint from 'facepaint';

export const themeColors = {
  white: '#FFF',
  black: '#0C181D',
  bg: '#F5F5F5',

  lightWhite: '#F4F3FE',
  lightWhite0: '#F5F5F5',
  darkWhite: '#BCBCBC',

  mainPurple: '#6C27AB',
  lightPurple0: '#7200DB',
  lightPurple1: '#5F7E88',
  lightPurple2: '#D0CCFF',
  lightPurple: '#6D11C0',
  darkPurple0: '#2A4753',
  darkPurple: '#256479',

  mainOrange: '#E6A057',
  lightOrange: '#ECAD6B',
  darkOrange: '#D88F43',

  mainGray: '#BCBCBC',

  lightGray0: '#E2EBEE',
  lightGray1: '#C4D7DE',
  lightGray: '#C5C0DB',
  lightGray2: '#EDEDED',
  lightGray3: '#858585',
  lightGray4: '#EAEAEA',
  lightGray5: '#A4A4A4',
  lightGray6: '#E1E3E6',
  lightGray7: '#ECEBF0',
  darkGray0: '#576B72',
  darkGray1: '#CDCDCD',
  darkGray: '#545454',
  mainRed: '#EB5757',

  mainGreen: '#27AE60',

  backgroundHover: '#f4f4f478',
  transparentGray: 'rgba(0, 0, 0, 0.15)',
};

export const themePalette = {
  primary: {
    default: themeColors.mainPurple,
    hover: themeColors.lightPurple,
    active: themeColors.lightPurple0,
    light: themeColors.lightPurple,
    dark: themeColors.black,
    disabled: themeColors.lightGray,
  },
  secondary: {
    default: themeColors.mainOrange,
    hover: themeColors.lightOrange,
    active: themeColors.darkOrange,
    light: themeColors.lightGray,
    dark: themeColors.black,
    disabled: themeColors.lightGray,
  },
};

export type FontWeightExpand = {
  thin: number;
  light: number;
  regular: number;
  medium: number;
  bold: number;
};
export type FontWeight = [number, number, number, number, number] & FontWeightExpand;

const fontWeight = [100, 300, 400, 500, 700] as FontWeight;
[fontWeight.thin, fontWeight.light, fontWeight.regular, fontWeight.medium, fontWeight.bold] = fontWeight;

export const themeTypography = {
  button: {
    fontSize: '1.6rem',
    fontWeight: fontWeight.regular,
    fontStyle: 'normal',
    lineHeight: '2rem',
    letterSpacing: -0.24,
    color: themeColors.white,
  },
  body1: {
    fontSize: '1.6rem',
    fontWeight: fontWeight.regular,
    fontStyle: 'normal',
    lineHeight: '2rem',
    letterSpacing: -0.24,
    color: themeColors.black,
    '&:placeholder': {
      color: themeColors.darkWhite,
      opacity: 1,
    },
  },
  body2: {
    fontSize: '1.4rem',
    fontWeight: fontWeight.light,
    fontStyle: 'normal',
    lineHeight: '1.7rem',
    letterSpacing: -0.24,
    color: themeColors.black,
    '&:placeholder': {
      color: themeColors.darkWhite,
      opacity: 1,
    },
  },
  mini1: {
    fontSize: '1.2rem',
    fontWeight: fontWeight.regular,
    fontStyle: 'normal',
    lineHeight: '1.4rem',
    letterSpacing: 0.3,
    color: themeColors.mainGray,
  },
  mini1_2: {
    fontSize: '1.2rem',
    fontWeight: fontWeight.regular,
    fontStyle: 'normal',
    lineHeight: '1.4rem',
    letterSpacing: 0.3,
    color: themeColors.black,
  },
  h1: {
    fontSize: '2.2rem',
    fontWeight: fontWeight.medium,
    fontStyle: 'normal',
    lineHeight: '2.6rem',
    letterSpacing: -0.24,
    color: themeColors.black,
  },
};

export type BreakpointsExpand = {
  xs: number;
  lg: number;
};

export type Breakpoints = [number, number] & BreakpointsExpand;

export const breakpoints: Breakpoints = [768, 1440] as Breakpoints;
[breakpoints.xs, breakpoints.lg] = breakpoints;

const grid = {
  columns: 12,
  gutter: '2rem',
  maxWidth: breakpoints.lg,
};

export const mq = facepaint(breakpoints.map((bp) => `@media (max-width: ${bp}px)`));

export const theme = {
  colors: themeColors,
  color: themeColors,
  palette: themePalette,
  typography: themeTypography,
  breakpoints,
  grid,
  mq,
  fontWeight,
  fontWeights: fontWeight,
};

export type ThemeColors = typeof themeColors;
export type ThemePalette = typeof themePalette;
export type ThemePaletteVariant = typeof themePalette.primary;
export type Theme = typeof theme;
