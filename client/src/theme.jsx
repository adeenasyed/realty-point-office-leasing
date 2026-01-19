import { createTheme } from '@mui/material/styles';

const customFont = 'Montserrat';

const theme = createTheme({
    
    typography: {
        fontFamily: customFont,
    },
    components: { 
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "5px",
                    boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.3)'
                }
            }
        },
    }
});

export default theme;