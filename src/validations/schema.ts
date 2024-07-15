import { z } from 'zod';

export const taransactionSchema =z.object({
    // zodのメソッドを使ってスキーマを定義
    type:z.enum(["income","expense"]),
    date:z.string().min(1,{message:"日付は必要です"}),//日付は必須　　最低1文字入力
    amout:z.number().min(1,{message:"金額は1円以上が必須です"}),//金額は整数
    content:z.string().min(1,{message:"内容を入力してください"}).max(50,{message:"内容は50文字以内にしてください"}),//内容は必須　最低1文字入力
    category:z.union([
        z.enum(["食費","日用品","住居費","交際費","娯楽","交通費"]),
        z.enum(["給与","副収入","お小遣い"]),
        z.literal(""),//空文字列を許可
    ]).refine((val)=> val !=="" ,{
        message:"カテゴリーを選択してください"
    })//カテゴリーは必須

});

// スキーマの型を定義
export type Schema = z.infer<typeof taransactionSchema>;