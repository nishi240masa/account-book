import { Box } from "@mui/material";
import MonthlySummary from "../components/MonthlySummary";
import Calendar from "../components/Calendar";
import TransactionMenu from "../components/TransactionMenu";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "../types";
import { useState } from "react";
import { format } from "date-fns";

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
  // 今日の日付を取得
  // date-fnsのformat関数を使って日付をフォーマット
  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);

  // 今日の日付と一致するデータだけを取得
  // filterメソッドで配列の要素を順番に処理
  // transaction.date === currentDayで今日の日付と一致するデータだけを取得
  const dailyTransactions =  monthlyTransactions.filter((transaction) => {
    // 今日の日付と一致するデータだけを取得
    return transaction.date === currentDay;
  });
  return (
    <Box sx={{ display: "flex" }}>
      {/* 左側に表示するコンテンツ */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
        />
      </Box>
      {/* 右側に表示するコンテンツ */}
      <Box>
        <TransactionMenu dailyTransactions={dailyTransactions} currentDay={currentDay}/>
        <TransactionForm />
      </Box>
    </Box>
  );
};

export default Home;
