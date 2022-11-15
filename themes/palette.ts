import { alpha } from '@mui/material/styles';
import { darken, lighten } from "polished";

function createGradient(color1: any, color2: any) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const PRIMARY = {
  lighter: lighten(0.2,'#73C04F'),
  light: lighten(0.3,'#73C04F'),
  main: '#73C04F',
  dark: darken(0.3,'#73C04F'),
  darker: darken(0.2,'#73C04F'),
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: lighten(0.2,'#424242'),
  light: lighten(0.3,'#424242'),
  main: '#424242',
  dark: darken(0.3,'#424242'),
  darker: darken(0.2,'#424242'),
  contrastText: '#fff',
};

const INFO = {
  lighter: lighten(0.2,'#2196F3'),
  light: lighten(0.3,'#2196F3'),
  main: '#2196F3',
  dark: darken(0.3,'#2196F3'),
  darker: darken(0.2,'#2196F3'),
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: lighten(0.2,'#4CAF50'),
  light: lighten(0.3,'#4CAF50'),
  main: '#4CAF50',
  dark: darken(0.1,'#4CAF50'),
  darker: darken(0.05,'#4CAF50'),
  contrastText: GREY[800],
};

const WARNING = {
  lighter: lighten(0.2,'#FBB500'),
  light: lighten(0.3,'#FBB500'),
  main: '#FBB500',
  dark: darken(0.1,'#FBB500'),
  darker: darken(0.05,'#FBB500'),
  contrastText: GREY[800],
};

const ERROR = {
  lighter: lighten(0.2,'#FF5252'),
  light: lighten(0.3,'#FF5252'),
  main: '#FF5252',
  dark: darken(0.3,'#FF5252'),
  darker: darken(0.2,'#FF5252'),
  contrastText: '#fff',
};
/**
 * Add a color other than:
 * primary, secondary, success, warning info, error
 */
const ACCENT = {
  lighter: lighten(0.2,'#82B1FF'),
  light: lighten(0.3,'#82B1FF'),
  main: '#82B1FF',
  dark: darken(0.3,'#82B1FF'),
  darker: darken(0.2,'#82B1FF'),
  contrastText: '#fff',
};

/**
 * Add a color other than: primary, secondary, success, warning info, error
 * color for the navigation button
 */
const GREYMENU = {
  lighter: lighten(0.2,'#fff'),
  light: lighten(0.3,'#fff'),
  main: '#fff',
  dark: darken(0.3,'#fff'),
  darker: darken(0.2,'#fff'),
  contrastText: '#637381',
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
  accent: createGradient(ACCENT.light, ACCENT.main),
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

const palette = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  accent: { ...ACCENT},
  greymenu:{ ...GREYMENU},
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
  background: { paper: '#fff', default: GREY[100], neutral: GREY[200] },
  action: {
    active: GREY[600],
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
