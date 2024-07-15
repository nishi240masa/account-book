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
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { format } from "date-fns";
import { formatMonth } from "./utils/fomatting";
import { Schema } from "./validations/schema";

function App() {
  // firebaseのエラーを判定する関数
  // 型ガードを使って普通のエラーとfirebaseのエラーを区別する
  function isFirebaseError(
    err: unknown
  ): err is { code: string; message: string } {
    return typeof err === "object" && err !== null && "code" in err;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // 型推論でDate型になる
  // 初期値で今の日付を取得
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // firesbaseから全部のデータを取得
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
        // 取得したデータをセット
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

  // 今月のデータだけを取得
  const monthlyTransactions = transactions.filter((transaction) => {
    // startsWithで今月のデータだけを取得
    // startsWithは文字列のメソッド,文字列が指定した文字列で始まるかどうかを判定
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  // firebaseにデータを保存する関数
  const handleSaveTransaction = async (transation: Schema) => {
    try {
      // firebaseにデータを保存
      // addDocでデータを追加
      // addDocではidを自動で生成してくれる
      const docRef = await addDoc(collection(db, "Transactions"), transation);
      console.log("Document written with ID: ", docRef.id);

      const newTransaction = {
        id: docRef.id, //生成されたid
        ...transation, //送られてきたデータをスプレット構文で展開
      } as Transaction; //型アサーション
      // 空文字が入らないことは開発者はわかっているから、型アサーションを使っている
      // 保存したデータを状態を管理しているtransactions配列に追加
      setTransactions((prevTransactions) => [
        ...prevTransactions, //prevTransactionsは直前のデータ
        newTransaction,
      ]);
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

  return (
    // ThemeProviderでテーマ(theme)を適用
    // MUIのやつじゃなくてemotionのやつ
    // import { ThemeProvider } from "@emotion/react";
    <ThemeProvider theme={theme}>
      {/* 既存のCSSの設定を消す */}
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLyout />}>
            <Route
              index
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                  onSaveTransaction={handleSaveTransaction}
                />
              }
            />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
