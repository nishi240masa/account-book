import { Grid, Paper } from "@mui/material";
import React from "react";
import MonthlySelector from "../components/MonthlySelector";
import CategoryChart from "../components/CategoryChart";
import BarChart from "../components/BarChart";
import TransactionTable from "../components/TransactionTable";
import { Transaction } from "../types";

interface ReportProps {
  monthlyTransactions: Transaction[];
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  isLoading: boolean;
}

const Report = ({
  monthlyTransactions,
  currentMonth,
  setCurrentMonth,
  isLoading,
}: ReportProps) => {
  const commonPaperStyle = {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    p: 2,
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* 日付エリア */}
        <MonthlySelector
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        {/* 円グラフ */}
        <Paper sx={commonPaperStyle}>
          <CategoryChart />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={commonPaperStyle}>
          {/* 棒グラフ */}
          <BarChart
            monthlyTransactions={monthlyTransactions}
            isLoading={isLoading}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {/* テーブル */}
        <TransactionTable />
      </Grid>
    </Grid>
  );
};

export default Report;
