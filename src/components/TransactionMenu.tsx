import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Drawer,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
//アイコン
import NotesIcon from "@mui/icons-material/Notes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DailySummary from "./DailySummary";
import { Transaction } from "../types";
import { formatCurrency } from "../utils/fomatting";
import IconComponents from "./common/IconComponents";

interface TransactionMenuProps {
  dailyTransactions: Transaction[];
  currentDay: string;
  onAddTransactionForm: () => void;
}

const TransactionMenu = ({
  dailyTransactions,
  currentDay,
  onAddTransactionForm,
}: TransactionMenuProps) => {
  const menuDrawerWidth = 320;
  return (
    <Drawer
      sx={{
        width: menuDrawerWidth,
        "& .MuiDrawer-paper": {
          width: menuDrawerWidth,
          boxSizing: "border-box",
          p: 2,
          top: 64,
          height: `calc(100% - 64px)`, // AppBarの高さを引いたビューポートの高さ
        },
      }}
      variant={"permanent"} //permanentは常に表示(固定のDrawerになる)
      anchor={"right"}
    >
      {/* Stackコンポーネントは子要素を均等に配置してくれる
      spacingで間の幅を指定 */}
      <Stack sx={{ height: "100%" }} spacing={2}>
        {/* 日付の表示 */}
        <Typography fontWeight={"fontWeightBold"}>
          日時： {currentDay}
        </Typography>

        {/* 収支の表示 */}
        <DailySummary dailyTransactions={dailyTransactions} />

        {/* 内訳タイトル&内訳追加ボタン */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          {/* 左側のメモアイコンとテキスト */}
          <Box display="flex" alignItems="center">
            <NotesIcon sx={{ mr: 1 }} />
            <Typography variant="body1">内訳</Typography>
          </Box>
          {/* 右側の追加ボタン */}
          <Button
            startIcon={<AddCircleIcon />}
            color="primary"
            onClick={onAddTransactionForm}
          >
            内訳を追加
          </Button>
        </Box>
        {/* 取引追加エリア */}
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          {/* ulタグみたいなやつ */}
          <List aria-label="取引履歴">
            <Stack spacing={2}>
              {/* 取引のリスト */}
              {/* map関数を用いてdailyTransactionsに入ってる要素を一個づつ処理していく */}
              {dailyTransactions.map((transaction) => (
                <ListItem disablePadding>
                  {/* 中身はカードで表示 */}
                  <Card
                    sx={{
                      width: "100%",
                      // 背景色をthemeで作った色に変更
                      // transaction.typeがincomeならlightgreen,flseならlightcoral
                      backgroundColor:
                        transaction.type === "income"
                          ? (theme) => theme.palette.incomeColor.light
                          : (theme) => theme.palette.expenseColor.light,
                    }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Grid
                          container
                          spacing={1}
                          alignItems="center"
                          wrap="wrap"
                        >
                          <Grid item xs={1}>
                            {/* icon */}
                            {/* 現在処理中のtransactionを指定 */}
                            {IconComponents[transaction.category]}
                          </Grid>
                          <Grid item xs={2.5}>
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                            >
                              {transaction.category}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant="body2" gutterBottom>
                              {transaction.content}
                            </Typography>
                          </Grid>
                          <Grid item xs={4.5}>
                            <Typography
                              gutterBottom
                              textAlign={"right"}
                              color="text.secondary"
                              sx={{
                                wordBreak: "break-all",
                              }}
                            >
                              {/* formatCurrencyは日本円に変換する自作関数 */}¥
                              {formatCurrency(transaction.amount)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </ListItem>
              ))}
            </Stack>
          </List>
        </Box>
      </Stack>
    </Drawer>
  );
};
export default TransactionMenu;
