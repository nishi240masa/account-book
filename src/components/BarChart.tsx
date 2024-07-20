import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box, Typography, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Transaction } from "../types";
import { calculateDailyBalances } from "../utils/financeCalcukations";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}
const BarChart = ({ monthlyTransactions, isLoading }: BarChartProps) => {
  // MUIのテーマを取得
  const theme = useTheme();
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "日別収支",
      },
    },
  };

  //   各日の収支を計算
  const dailyBalances = calculateDailyBalances(monthlyTransactions);

  //   labels: 日付
  //   日付の配列を取得
  //   Object.keys()でオブジェクトのキーを配列で取得
  //   .sort()古い日付から新しい日付の順に並び替え
  const dateLabels = Object.keys(dailyBalances).sort();

  // Data: 収支
  const expenseData = dateLabels.map((day) => dailyBalances[day].expense);
  // Data: 収入
  const incomeData = dateLabels.map((day) => dailyBalances[day].income);

  //   チャートデータ
  const data: ChartData<"bar"> = {
    labels: dateLabels,
    datasets: [
      {
        label: "支出",
        data: expenseData,
        backgroundColor: theme.palette.expenseColor.light,
      },
      {
        label: "収入",
        data: incomeData,
        backgroundColor: theme.palette.incomeColor.light,
      },
    ],
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      {/* isLoadingがtrueの時（全体のdataがない時）はローリング画面を表示 */}
      {isLoading ? (
        <CircularProgress />
      ) : monthlyTransactions.length > 0 ? ( // monthlyTransactionsがある時
        <Bar options={options} data={data} />
      ) : (
        <Typography>データがありません</Typography>
      )}
    </Box>
  );
};

export default BarChart;
