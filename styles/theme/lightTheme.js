import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  direction:'rtl',
  typography: {
    fontFamily: "iransans, sans-serif",
  }
});

export default lightTheme;
