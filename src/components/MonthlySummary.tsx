import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Transaction } from "../types";
import { financeCalcukations } from "../utils/financeCalcukations";

interface MonthlySummaryProps {
  monthlyTransactions: Transaction[];
}

const MonthlySummary = ({ monthlyTransactions }: MonthlySummaryProps) => {
  console.log(monthlyTransactions);

  // financeCalcukations関数は収入,支出,残高を計算する関数
  // 変数income,expense,balanceに分割代入
  const { income, expense, balance } = financeCalcukations(monthlyTransactions);

  return (
    // MUIのGridコンポーネントはflexboxを使用する
    // だから、Grid itemはflexアイテムになる。よって、親要素の高さに合わされる。
    // 一つでもGrid itemが大きくなれば、Grid containerが大きくなるので他のGrid itemも大きくなる。
    <Grid container spacing={{ xs: 1, sm: 2 }} mb={2}>
      {/* 収入 */}
      {/* display={"flex"}を使用するとCardがフレックスアイテムになる。 */}
      {/* 初期値でalign-items: stretch;があるから、フレックスアイテムは親要素Grid itemの高さに合わされる */}
      <Grid item xs={4} display={"flex"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.incomeColor.main,
            color: "white",
            borderRadius: "10px",
            flexGrow: 1,
          }}
        >
          {/* padding:1は 8px,2は16px*/}
          {/* xs:0px以上,sm:600px以上,md:900px以上 */}
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              {/* icon */}
              <ArrowUpwardIcon sx={{ fontSize: "2rem" }} />
              <Typography>収入</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                // xs:0px以上,sm:600px以上,md:900px以上
                fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
              }}
            >
              ¥{income}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* 支出*/}
      <Grid item xs={4} display={"flex"}>
        <Card
          sx={{
            // theme.palette.expenseColor.mainはtheme.tsで定義した色
            bgcolor: (theme) => theme.palette.expenseColor.main,
            color: "white",
            borderRadius: "10px",
            // flexGrow:1は主軸方面（今回はrow：横）の親要素の空白を埋める
            // itemが複数ある場合、それぞれのitemでflexGrow:1を指定すると、それぞれのitemが同じ幅になる
            flexGrow: 1,
          }}
        >
          {/* padding:1は 8px,2は16px*/}
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              {/* icon */}
              <ArrowDownwardIcon sx={{ fontSize: "2rem" }} />
              <Typography>支出</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
              }}
            >
              ¥{expense}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* 残高 */}
      <Grid item xs={4} display={"flex"}>
        <Card
          sx={{
            // theme.palette.expenseColor.mainはtheme.tsで定義した色
            bgcolor: (theme) => theme.palette.balanceColor.main,
            color: "white",
            borderRadius: "10px",
            flexGrow: 1,
          }}
        >
          {/* padding:1は 8px,2は16px*/}
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              {/* icon */}
              <AccountBalanceIcon sx={{ fontSize: "2rem" }} />
              <Typography>残高</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
              }}
            >
              ¥{balance}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MonthlySummary;
