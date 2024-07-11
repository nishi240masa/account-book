import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import "../calendar.css";
import { DatesSetArg, EventContentArg } from "@fullcalendar/core";
import { calculateDailyBalances } from "../utils/financeCalcukations";
import { Balance, Transaction, CalenderContent } from "../types";
import { formatCurrency } from "../utils/fomatting";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useTheme } from "@mui/material";
import { isSameMonth } from "date-fns";

interface CalendarProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
  today: string;
}

const Calendar = ({
  monthlyTransactions,
  setCurrentMonth,
  setCurrentDay,
  currentDay,
  today,
}: CalendarProps) => {
  // イベントの内容
  // 配列の中にイベントのオブジェクトを入れる
  // カレンダーに表示されるイベントの内容を設定する
  // const events = [
  //   {
  //     title: "Meeting",
  //     start: "2024-06-20",
  //     income: "¥1000",
  //     expense: "¥500",
  //     balance: "¥500",
  //   },
  // ];

  const theme = useTheme();

  // 日付ごとの収支を計算
  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  console.log(dailyBalances);

  //カレンダー用のイベントを生成する関数
  const createCalenderEvents = (
    dailyBalances: Record<string, Balance>
  ): CalenderContent[] => {
    // Object.keys()でオブジェクトのキーを配列で取得
    // dateはオブジェクトのキーの配列
    // mapメソッドで配列の要素を順番に処理
    //分割代入でdailyBalancesオブジェクトのdateキーの要素を代入
    return Object.keys(dailyBalances).map((date) => {
      const { income, expense, balance } = dailyBalances[date];
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      };
    });
  };

  const calendarEvents = createCalenderEvents(dailyBalances);
  console.log(calendarEvents);

  const backgroundEvent = {
    start: currentDay,
    end: currentDay,
    display: "background",
    backgroundColor: theme.palette.incomeColor.light,
  };

  console.log([...calendarEvents, backgroundEvent]);
  // イベントの内容をカスタマイズする関数
  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div className="mony" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className="mony" id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className="mony" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    );
  };

  // カレンダーの日付が変更されたときの処理
  // datesetInfoはカレンダーの情報
  // 月の日付取得
  //
  const handleDateSet = (datesetInfo: DatesSetArg) => {
    // setCurrentMonth関数で現在の月をセット
    // datesetInfo.view.currentStartはカレンダーの表示されている月の最初の日
    const currentMonth = datesetInfo.view.currentStart;
    setCurrentMonth(currentMonth);

    const todayDate = new Date();

    // 今日の日付が表示されている月と同じ月かどうかを判定
    // isSameMonthはdate-fnsの関数,引数に2つの日付を取り、同じ月かどうかを判定
    if (isSameMonth(todayDate, currentMonth)) {
      // todayが表示されている月と同じ月なら
      // setCurrentDay関数で今日の日付をセット
      setCurrentDay(today);
    }
  };

  // 日付をクリックしたときの処理
  // dateInfoはクリックした日付の情報
  const handleDteClick = (dateInfo: DateClickArg) => {
    // setCurrentDay関数でクリックした日付をセット
    // dateInfo.dateStrはクリックした日付
    setCurrentDay(dateInfo.dateStr);
  };

  return (
    <FullCalendar
      locale={jaLocale}
      // dateClickを使うためにinteractionPluginをインポート
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      // カレンダーに表示されるイベントの内容
      // Eventとバックグラウンドイベントを配列で統合
      events={[...calendarEvents, backgroundEvent]}
      eventContent={renderEventContent}
      // イベントの日付が変更されたときの処理を設定
      datesSet={handleDateSet}
      //fullcalendarのイベントを使って日付をクリックしたときの処理を設定
      //fullcalendarとは別でdateClickをnpmインストールしている
      dateClick={handleDteClick}
    />
  );
};

export default Calendar;
