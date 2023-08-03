import { extendTheme } from 'native-base';

const colors = {
  brand: {
    900: '#171900',
    800: '#444900',
    700: '#737a00',
  },
  primary: {
    50: '#ebe6ff',
    100: '#c3b7fe',
    200: '#9a88f8',
    300: '#7258f3',
    400: '#4b29ef',
    500: '#3110d5',
    600: '#260ca7',
    700: '#1a0778',
    800: '#0e0449',
    900: '#05011e',
  },

  // Make sure values below matches any of the keys in `fontConfig`
};

export const theme = extendTheme({
  colors,
});
