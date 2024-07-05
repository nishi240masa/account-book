import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import "../calendar.css";
import { EventContentArg } from "@fullcalendar/core";
import { calculateDailyBalances } from "../utils/financeCalcukations";
import { Balance, Transaction, CalenderContent } from "../types";
import { formatCurrency } from "../utils/fomatting";

interface CalendarProps {
  monthlyTransactions: Transaction[];
}

const Calendar = ({ monthlyTransactions }: CalendarProps) => {
  // イベントの内容
  // 配列の中にイベントのオブジェクトを入れる
  // カレンダーに表示されるイベントの内容を設定する
  const events = [
    {
      title: "Meeting",
      start: "2024-06-20",
      income: "¥1000",
      expense: "¥500",
      balance: "¥500",
    },
  ];

  // 日付ごとの収支を計算
  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  console.log(dailyBalances);

  //カレンダー用のイベントを生成する関数
  const createCalenderEvents = (
    dailyBalances: Record<string, Balance>
  ): CalenderContent[] => {
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
  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={calendarEvents} //カレンダーに表示されるイベントの内容
      eventContent={renderEventContent}
    />
  );
};

export default Calendar;
