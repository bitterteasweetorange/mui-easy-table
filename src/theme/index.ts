import { alpha, createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#555c46',
    },
    secondary: {
      main: '#f9f2de',
    },
    action: {
      selected: alpha('#555c46', 0.2),
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: 'standard',
      },
    },
  },
})
