export type ThemeColors = {
  base: {
    white: string;
    black: string;
  };
  primary: Record<string, string> & { DEFAULT: string };
  secondary: Record<string, string> & { DEFAULT: string };
  success: Record<string, string> & { DEFAULT: string };
  warning: Record<string, string> & { DEFAULT: string };
  danger: Record<string, string> & { DEFAULT: string };
  semantic: {
    background: string;
    surface: string;
    border: string;
    text: string;
    textSecondary: string;
    divider: string;
  };
};

export type Colors = {
  light: ThemeColors;
  dark: ThemeColors;
};

export type Space = Record<string | number, string>;

export interface Typography {
  fontFamily: {
    sans: string[];
    mono: string[];
  };
  fontSize: Record<string, string>;
  fontWeight: Record<string, string>;
  lineHeight: Record<string, string>;
  letterSpacing: Record<string, string>;
}

export type Radii = Record<string, string>;

export type Shadows = Record<string, string>;

export type Opacity = Record<string | number, string>;

export type Theme = {
  colors: Colors;
  space: Space;
  typography: Typography;
  radii: Radii;
  shadows: Shadows;
  opacity: Opacity;
};
