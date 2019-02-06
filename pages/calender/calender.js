import React from "react";
import styled from "styled-components";
import BigCalendar from "react-big-calendar";
import moment from "moment";

import events from "./events";
import dates from "../../utils/dates";

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
const localizer = BigCalendar.momentLocalizer(moment);

const CalenderWrap = styled.div`
  min-height: 60rem;
`;

const ScheduleCalender = () => (
  <CalenderWrap>
    <BigCalendar
      events={events}
      views={allViews}
      step={60}
      showMultiDayTimes
      max={dates.add(dates.endOf(new Date(2015, 17, 1), "day"), -1, "hours")}
      defaultDate={new Date(2015, 3, 1)}
      localizer={localizer}
    />
  </CalenderWrap>
);

export default ScheduleCalender;
