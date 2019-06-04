import React, { Component } from "react";
import moment from "moment";
import OnlineBookingWrapper from "../components/OnlineBookingWrapper";
import { Row, Col, TimePicker, Calendar, Icon } from "antd";
import { connect } from "react-redux";
import { serviceDataRequest } from "../modules/clientModule";
import { createOnlineOrderRequest } from "../modules/orderModule";
import { convertTimeformat, convert, formatDate } from "../utils/helpers";
import Cookies from "js-cookie";
import SpinerWrap from "../components/Spinner";
import FormInput from "../components/styles/FormInput";
import FormWrap from "../components/styles/FormWrap";
import Button from "../components/styles/Button";
import { color } from "../components/styles/constant";
import Router from "next/router";

class SelectTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "",
      date: ""
    };
  }

  handleSubmit = data => {
    const { user } = this.props.data;

    let t = moment(data.time).format();
    let x = t.split("T");
    let pickedDate = data.time;
    let cleanTime = function() {
      let x = convertTimeformat("24", moment(data.time).format("h:mm a")).split(
        ":"
      );
      let hr = parseInt(x[0]);
      let min = x[1];
      return `${hr}:${min}`;
    };
    let obj = {
      total_price: 0,
      company: user.company,
      customer: user.id,
      products: [],
      start_time: `${
        moment(data.date)
          .format()
          .split("T")[0]
      }T${cleanTime()}`,
      note: "online booking",
      services: this.props.data.service.map(x => ({
        duration: x.duration,
        pet: x.pet[0],
        price: x.price,
        start_time: `${
          moment(data.date)
            .format()
            .split("T")[0]
        }T${cleanTime()}`,
        service: x.service
      }))
    };
    this.props.createOnlineOrderRequest(obj);
  };

  onChange = time => {
    console.log(time._d);
    this.setState({ time: time._d });
  };

  onPanelChange = value => {
    console.log(value);
    this.setState({ date: value._d });
  };

  render() {
    function goBack() {
      Router.back();
    }
    const format = "HH:mm";
    console.log(this.props.data);
    return (
      <OnlineBookingWrapper>
        {this.props.loading === true ? <SpinerWrap /> : null}
        <div className="header">
          <Icon onClick={goBack} type="left" /> Pick date and time
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="p-2">
                <br />
                <FormWrap>
                  <label htmlFor="">Select Time</label>
                  <TimePicker format={format} onChange={this.onChange} />
                </FormWrap>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2" span={24}>
              <div className="p-2">
                <div
                  style={{
                    width: "100%",
                    border: "1px solid #d9d9d9",
                    borderRadius: 4
                  }}
                >
                  <Calendar
                    fullscreen={true}
                    // onPanelChange={this.onPanelChange}
                    onSelect={this.onPanelChange}
                  />
                </div>
                ,
              </div>
            </div>
          </div>
        </div>
        {this.state.date !== "" && this.state.time !== "" && (
          <footer>
            <div className="selected-info-wrap" />
            <button
              onClick={() =>
                this.handleSubmit({
                  time: this.state.time,
                  date: this.state.date,
                  data: this.props.data
                })
              }
            >
              Continue
            </button>
          </footer>
        )}
      </OnlineBookingWrapper>
    );
  }
}

const mapStateToProps = state => ({
  data: state.clientReducer.serviceData,
  loading: state.clientReducer.loadingClient || state.orderReducer.loading
});

export default connect(
  mapStateToProps,
  {
    serviceDataRequest,
    createOnlineOrderRequest
  }
)(SelectTime);
