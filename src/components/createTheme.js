import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: {
      light: '#f0ead6',
      main: '#202020',
      dark: '#000000',
      contrastText: '#fff'
    },
    secondary: {
      light: '#202020',
      main: '#fff',
      dark: '#aaa',
      contrastText: '#202020'
    },
    error: {
      main: '#FF0000'
    },
    warning: {
      main: '#FFFF00'
    },
    info: {
      main: '#FFF',
      light: '#66FCF1',
      contrastText: '#000'
    },
    success: {
      main: '#08FF00'
    }
  }
});