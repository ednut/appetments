import React from "react";
import BodyContent from "./styles/OnlineBooking";

const OnlineBookingWrapper = props => (
  <div className="container">
    <BodyContent>{props.children}</BodyContent>
  </div>
);

export default OnlineBookingWrapper;
