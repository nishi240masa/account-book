import { z } from 'zod';

export const taransactionSchema =z.object({
    // zodのメソッドを使ってスキーマを定義
    type:z.enum(["income","expense"]),
    date:z.string().min(1,{message:"日付は必要です"}),//日付は必須　　最低1文字入力
    amount:z.number().min(1,{message:"金額は1円以上が必須です"}),//金額は整数
    content:z.string().min(1,{message:"内容を入力してください"}).max(50,{message:"内容は50文字以内にしてください"}),//内容は必須　最低1文字入力
    category: z
    .union([
      z.enum(["食費", "日用品", "住居費", "交際費", "娯楽", "交通費"]),
      z.enum(["給与", "副収入", "お小遣い"]),
    //   z.literal(""),これだとundefinedになる
    z.string().length(0),//空文字を許可
    ])
    .refine((val) => val !== "", {
      message: "カテゴリを選択してください",
    }),

});

// スキーマの型を定義
export type Schema = z.infer<typeof taransactionSchema>;