import { Balance, Transaction } from '../types/index';

// 引数にはTransaction型のDBから取得したデータを配列で受け取る
export function financeCalcukations(transactions:Transaction[]):Balance{

    // reduceメソッドを使って収入,支出,残高を計算
    // reduceメソッドは配列の各要素を順番に処理していくメソッド
    // 第一引数のaccは初期値,第二引数のtransactionは配列の要素
    // accは前回の処理結果を引き継ぐ
    // accはオブジェクトで初期値を設定
    // transactionのtypeがincomeの場合は収入にamountを加算
    return transactions.reduce((acc, transaction) => {
        if(transaction.type === "income"){
           acc.income += transaction.amount;
    }else{
        acc.expense += transaction.amount;
    }
        acc.balance = acc.income - acc.expense;

        return acc
    },{income:0,expense:0,balance:0})

}