import { Grid, Paper } from "@mui/material";
import React from "react";
import MonthlySelector from "../components/MonthlySelector";
import CtegoryChart from "../components/CtegoryChart";
import BarChart from "../components/BarChart";
import TransactionTable from "../components/TransactionTable";

interface ReportProps {
  currentMonth: Date;
  setCurrentMonth:React.Dispatch<React.SetStateAction<Date>>
}

const Report = ({currentMonth,setCurrentMonth}:ReportProps) => {
  const commonPaperStyle = {
    height: { xs: "auto", md: "400px" },
    display: "flex",
    flexDirection: "column",
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MonthlySelector currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={commonPaperStyle}>
          <CtegoryChart />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={commonPaperStyle}>
          <BarChart />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <TransactionTable />
      </Grid>
    </Grid>
  );
};

export default Report;
