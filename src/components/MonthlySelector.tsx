import { Box, Button } from "@mui/material";
import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// date-fns v3なのでドキュメントの2個目のコードを参考にする
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
// date-fnsの日本語化のためのimport
import { ja } from "date-fns/locale";
import { addMonths } from "date-fns";

interface MonthlySelectorProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const MonthlySelector = ({
  currentMonth,
  setCurrentMonth,
}: MonthlySelectorProps) => {
  // 前月に移動する関数
  const handlePreviousMonth = () => {
    // addMonthsはdate-fnsの関数
    // currentMonthの値を-1することで前月に移動
    const previewMonth = addMonths(currentMonth, -1);
    setCurrentMonth(previewMonth);
  };

  //   次月に移動する関数
  const handleNextMonth = () => {
    // addMonthsはdate-fnsの関数
    // currentMonthの値を-1することで前月に移動
    const previewMonth = addMonths(currentMonth, +1);
    setCurrentMonth(previewMonth);
  };

  //   日付が変更されたときの処理
  //   newDateは日付が変更されたときの値
  //   今回は初期値を与えているが、nullの場合もあるため、nullを許容するためにDate | nullとしている
  const handleDateChange = (newDate: Date | null) => {
    // newDateが存在する場合にのみ処理を行う
    // stateにnullを設定することはできないため、nullの場合は処理を行わない
    if (newDate) {
      setCurrentMonth(newDate);
    }
  };

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
        <Button
          onClick={handlePreviousMonth}
          color={"error"}
          variant="contained"
        >
          先月
        </Button>
        {/* viewsはカレンダーに表示させたい情報を選べる */}
        {/* formatは表示の仕方を加工できる */}
        <DatePicker
          onChange={handleDateChange}
          value={currentMonth}
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
        <Button onClick={handleNextMonth} color={"primary"} variant="contained">
          次月
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthlySelector;
