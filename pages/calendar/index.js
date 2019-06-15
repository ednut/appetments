import React, { Component } from "react";

import AdminContainer from "../../components/AdminContainer";
import ScheduleCalender from "./calender";
import CalenderWrap from "../../components/styles/CalenderWrap";

class Calender extends Component {
  render() {
    return (
      <AdminContainer>
        <CalenderWrap>
          <ScheduleCalender />
        </CalenderWrap>
      </AdminContainer>
    );
  }
}

export default Calender;
