import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import AppLyout from "./components/layout/AppLyout";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Transaction } from "./types/index";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // awaitを使うためにasyncをつける
    // useEffectの中でasyncを使うときは即時関数を使う
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        console.log(querySnapshot);

        const taransactionsData = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction;
        });
        console.log(taransactionsData);
        setTransactions(taransactionsData);
      } catch (error) {
        // エラー処理
        console.log("データの取得に失敗しました", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    // ThemeProviderでテーマを適用
    // MUIのやつじゃなくてemotionのやつ
    // import { ThemeProvider } from "@emotion/react";
    <ThemeProvider theme={theme}>
      {/* 既存のCSSの設定を消す */}
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLyout />}>
            <Route index element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
