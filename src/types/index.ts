// ここで型を定義する

// トランザクションの種類の型を定義
export type TransactionType = "income" | "expense";
// 収入のカテゴリーを定義
export type IncomeCategory = "給与"|"副収入"|"お小遣い";
// 支出のカテゴリーを定義
export type ExpenseCategory = "食費"|"日用品"|"住居費"|"交際費"|"娯楽"|"交通費";

// トランザクションの型を定義
export interface Transaction{
    id: string;
    date: string;
    amount: number;
    content: string;
    type: TransactionType;
    category: ExpenseCategory | IncomeCategory;
}

// 収入,支出,残高の型を定義
export interface Balance{
    income:number,
    expense:number,
    balance:number,
}