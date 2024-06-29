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
  // firebaseのエラーを判定する関数
  // 型ガードを使って普通のエラーとfirebaseのエラーを区別する
  function isFirebaseError(
    err: unknown
  ): err is { code: string; message: string } {
    return typeof err === "object" && err !== null && "code" in err;
  }

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
      } catch (err) {
        // エラー処理
        if (isFirebaseError(err)) {
          console.error("Firestore Error:", err);
          // console.error("Firebase Error code:", err.code);
          // console.error("Firebase Error message:", err.message);
        } else {
          console.error("一般的なエラー", err);
        }
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
