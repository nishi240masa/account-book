import { createTheme } from "@mui/material";

// MUIが提供している
export const theme = createTheme({
    typography:{
        fontFamily: 'Noto Sans JP, Roboto, "Helvetica Neue", Arial, sans-serif',
        
        // fontの設定
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
});