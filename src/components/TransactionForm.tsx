import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ExpenseCategory, IncomeCategory, Transaction } from "../types";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import TrainIcon from "@mui/icons-material/Train";
import WorkIcon from "@mui/icons-material/Work";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import SavingsIcon from "@mui/icons-material/Savings";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, taransactionSchema } from "../validations/schema";

interface TransactionFormProps {
  onCloseForm: () => void;
  isEntryDrawerOpen: boolean;
  currentDay: string;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  selectedTransaction: Transaction | null;
  onDeleteTransaction: (TransactionID: string) => void;
  setSelectedTransaction: React.Dispatch<
    React.SetStateAction<Transaction | null>
  >;
  onUpdateTransaction: (
    transaction: Schema,
    transactionId: string
  ) => Promise<void>;
}

type IncomeExpense = "income" | "expense";

interface CategoryItem {
  label: IncomeCategory | ExpenseCategory;
  icon: JSX.Element;
}

const TransactionForm = ({
  onCloseForm,
  isEntryDrawerOpen,
  currentDay,
  onSaveTransaction,
  selectedTransaction,
  onDeleteTransaction,
  setSelectedTransaction,
  onUpdateTransaction,
}: TransactionFormProps) => {
  const formWidth = 320;

  const expenseCategories: CategoryItem[] = [
    { label: "住居費", icon: <AddHomeIcon fontSize="small" /> },
    { label: "交際費", icon: <Diversity3Icon fontSize="small" /> },
    { label: "娯楽", icon: <SportsTennisIcon fontSize="small" /> },
    { label: "交通費", icon: <TrainIcon fontSize="small" /> },
    { label: "食費", icon: <FastfoodIcon fontSize="small" /> },
    { label: "日用品", icon: <AlarmIcon fontSize="small" /> },
  ];

  const incomeCategories: CategoryItem[] = [
    { label: "給与", icon: <WorkIcon fontSize="small" /> },
    { label: "副収入", icon: <AddBusinessIcon fontSize="small" /> },
    { label: "お小遣い", icon: <SavingsIcon fontSize="small" /> },
  ];

  const [categories, setcategories] = useState(expenseCategories);

  // フォームの初期値を設定
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Schema>({
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    },
    resolver: zodResolver(taransactionSchema),
  });
  console.log(errors);

  const incomeExpenseToggle = (type: IncomeExpense) => () => {
    setValue("type", type);
    setValue("category", ""); //カテゴリーをリセット
  };

  // 現在の収支タイプを取得
  const currentType = watch("type");

  useEffect(() => {
    const newCategories =
      currentType === "income" ? incomeCategories : expenseCategories;
    setcategories(newCategories);
  }, [currentType]);

  useEffect(() => {
    setValue("date", currentDay);
  }, [currentDay]);

  // フォームの送信処理
  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (selectedTransaction) {
      onUpdateTransaction(data, selectedTransaction.id)
        .then(() => {
          // console.log("更新しました");
          setSelectedTransaction(null);
        })
        .catch((error) => {
          console.error("更新に失敗しました", error);
        });
    } else {
      onSaveTransaction(data)
        .then(() => {
          console.log("保存しました");
        })
        .catch((error) => {
          console.error("更新に失敗しました", error);
        });
    }

    // フォームのリセット
    // resetメソッドはreact-hook-formのメソッド
    reset({
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    }); //defaultValuesで設定した初期値に戻すとundefinedになる可能性があるので、再度初期値を設定
  };

  useEffect(() => {
    // 選択肢が更新されたからフォームの値を更新
    if (selectedTransaction) {
      const categoryExits = categories.some(
        (category) => category.label === selectedTransaction.category
      );
      setValue("category", categoryExits ? selectedTransaction.category : "");
    }
  }, [selectedTransaction, categories]);

  // selectedTransactionが変更されたらフォームに値をセット
  useEffect(() => {
    // selectedTransactionがある場合はフォームに値をセット
    if (selectedTransaction) {
      setValue("type", selectedTransaction.type);
      setValue("date", selectedTransaction.date);
      setValue("amount", selectedTransaction.amount);
      setValue("content", selectedTransaction.content);
    } else {
      reset({
        type: "expense",
        date: currentDay,
        amount: 0,
        category: "",
        content: "",
      });
    }
  }, [selectedTransaction]);

  // データ削除処理
  const handleDelete = () => {
    if (selectedTransaction) {
      onDeleteTransaction(selectedTransaction?.id);
      setSelectedTransaction(null);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDrawerOpen ? formWidth : "-2%", // フォームの位置を調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン Icon */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        {/* Stack内にボタンを入れることで均等に並べられる */}
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}
          {/* Controllerはmuiとreact-hook-formを統合するやつ */}
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ButtonGroup fullWidth>
                <Button
                  variant={field.value === "expense" ? "contained" : "outlined"}
                  color="error"
                  onClick={incomeExpenseToggle("expense")}
                >
                  支出
                </Button>
                <Button
                  onClick={incomeExpenseToggle("income")}
                  color={"primary"}
                  variant={field.value === "income" ? "contained" : "outlined"}
                >
                  収入
                </Button>
              </ButtonGroup>
            )}
          />

          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="日付"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                // ！！はboolean型に変換するため
                error={!!errors.date} //errosオブジェクトにdateがあればtrue
                // ?はdateがあればerrors.date.messageを表示
                helperText={errors.date?.message} //dateのエラーメッセージを表示
              />
            )}
          />
          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                // ！！はboolean型に変換するため
                error={!!errors.category}
                // ?はcategoryがあればerrors.category.messageを表示
                helperText={errors.category?.message}
                {...field}
                id="カテゴリ"
                label="カテゴリ"
                select
              >
                {categories.map((category, index) => (
                  <MenuItem value={category.label} key={index}>
                    <ListItemIcon>{category.icon}</ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => {
              console.log(field);
              return (
                <TextField
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                  {...field}
                  value={field.value === 0 ? "" : field.value}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10) || 0;
                    field.onChange(newValue);
                  }}
                  label="金額"
                  type="number"
                />
              );
            }}
          />
          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                // ！！はboolean型に変換するため
                error={!!errors.content}
                helperText={errors.content?.message}
                {...field}
                label="内容"
                type="text"
              />
            )}
          />
          {/* 保存ボタン */}
          <Button
            type="submit"
            variant="contained"
            color={currentType === "income" ? "primary" : "error"}
            fullWidth
          >
            {selectedTransaction ? "更新" : "保存"}
          </Button>
          {selectedTransaction && (
            <Button
              onClick={handleDelete}
              variant="outlined"
              color={"secondary"}
              fullWidth
            >
              削除
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
