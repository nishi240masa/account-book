import { Balance, Transaction } from '../types/index';

// 引数にはTransaction型のDBから取得したデータを配列で受け取る
//収支,支出,残高を計算する関数
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

// 日付ごとの収支を計算する関数
// 引数にはTransaction型の月ごとのデータを配列で受け取る
export function calculateDailyBalances(transactions:Transaction[]):Record<string,Balance>{

    // reduceメソッドを使って日付ごとの収支を計算
    // reduceメソッドは配列の各要素を順番に処理していくメソッド
    return transactions.reduce<Record<string,Balance>>((acc,transaction) => {
        const day = transaction.date;

        // dayがaccに存在しない場合はdayをキーにしてオブジェクトを作成
        if(!acc[day]){
            // gaga
            acc[day] = {income:0,expense:0,balance:0}
        }
        if(transaction.type === "income"){
            acc[day].income += transaction.amount;
        }else{
            acc[day].expense += transaction.amount;
        }

         acc[day].balance = acc[day].income - acc[day].expense;
         return acc
    },{})
    // 戻り値の形
    // {
    // "2024-06-20":{income:1000,expense:500,balance:500},
    // "2024-06-21":{income:500,expense:700,balance:-200},
    // }
}