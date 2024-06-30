import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import "../calendar.css";
import { EventContentArg } from "@fullcalendar/core";

const Calendar = () => {
  // イベントの内容
  // 配列の中にイベントのオブジェクトを入れる
  const events = [
    {
      title: "Meeting",
      start: "2024-06-20",
      income: "¥1000",
      expense: "¥500",
      balance: "¥500",
    },
  ];

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
      events={events}
      eventContent={renderEventContent}
    />
  );
};

export default Calendar;
