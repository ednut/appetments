import React, { Component } from "react";

import AdminContainer from "../../components/AdminContainer";
import ScheduleCalender from "./Calender";
import styled from "styled-components";
import { shadowStyle, color, height } from "../../components/styles/constant";

import "../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";

class Calender extends Component {
  render() {
    return (
      <AdminContainer>
        <ScheduleCalender />
      </AdminContainer>
    );
  }
}

export default Calender;
