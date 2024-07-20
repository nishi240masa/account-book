import { Box, Button } from "@mui/material";
import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// date-fns v3なのでドキュメントの2個目のコードを参考にする
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
// date-fnsの日本語化のためのimport
import { ja } from "date-fns/locale";

const MonthlySelector = () => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ja}
      // monthAndYearが存在しないため、コメントアウト
      // DatePickerの方で違う形で指定する
      // dateFormats={{ monthAndYear: "yyyy年 MM月" }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {/* variant="contained"は塗りつぶし */}
        <Button color={"error"} variant="contained">
          先月
        </Button>
        {/* viewsはカレンダーに表示させたい情報を選べる */}
        {/* formatは表示の仕方を加工できる */}
        <DatePicker
          label="年月を選択"
          sx={{ mx: 2, backgroundColor: "white" }}
          views={["year", "month"]}
          format="yyyy/MM"
          // hidden: false,を指定することで、toolbarを表示させる
          slotProps={{
            toolbar: {
              toolbarFormat: "yyyy/MM",
              hidden: false,
            },
            // dateFormats={{ monthAndYear: "yyyy年 MM月" }}代わり
            calendarHeader: { format: "yyyy/MM" },
          }}
        />
        <Button color={"primary"} variant="contained">
          次月
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthlySelector;
