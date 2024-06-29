import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";

// MUIのテーマの型定義を拡張
declare module '@mui/material/styles' {

    // テーマの型定義
    // paletteColorはプロパティが必要
    interface Palette {
        incomeColor: PaletteColor;
        expenseColor: PaletteColor;
        balanceColor: PaletteColor;
    }
     // paletteColorOptionsはプロパティが必須ではない
    interface PaletteOptions {
        incomeColor?: PaletteColorOptions;
        expenseColor?: PaletteColorOptions;
        balanceColor?: PaletteColorOptions;
    }
}

// MUIが提供している
export const theme = createTheme({
    typography:{
        fontFamily: 'Noto Sans JP, Roboto, "Helvetica Neue", Arial, sans-serif',
        
        // fontの設定
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    // 色の設定
    palette: {
        incomeColor: {
            main: blue[500],
            light: blue[100],
            dark:blue[700],
        },
        expenseColor: {
            main: red[500],
            light: red[100],
            dark:red[700],
        },
        balanceColor: {
            main: green[500],
            light: green[100],
            dark:green[700],
        },
    },
});