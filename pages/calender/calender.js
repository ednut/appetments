import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";

import { connect } from "react-redux";
import {
  getAllOrdersRequest,
  createOrderRequest,
  updateOrderRequest,
  deleteOrderRequest
} from "../../modules/orderModule";
import { getAllCompanyModule } from "../../modules/company";
import {
  getAllClientsRequest,
  getClientsByIdRequest
} from "../../modules/clientModule";
import { getAllServiceRequest } from "../../modules/serviceModule";
import { getAllProductsRequest } from "../../modules/productModule";
import styled from "styled-components";
import { shadowStyle, color, height } from "../../components/styles/constant";
import SpinerWrap from "../../components/Spinner";
import CreateOrderModal from "./createOrderModal";
import UpdateOrderModal from "./updateOrderModal";
import LargePopup from "./LargePopup";

const localizer = BigCalendar.momentLocalizer(moment);

const ButtonWrap = styled.div`
  position: relative;
  .action-wrap {
    margin-bottom: ${height.gutterHeight};
    text-align: right;
  }
  button {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    border: none;
    background-color: #083e8d;
    color: #fff;
    animation: moveInBottom 1s linear;
    transition: all 0.2s;
    padding-top: 5px;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 50px;
    right: 40px;
    cursor: pointer;
    outline: none;
    z-index: 100;
    i {
      font-size: 32px;
    }
    &:hover {
      transform: translateY(-0.3rem);
    }
  }
`;

class ScheduleCalender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      picked_date: "",
      customer: "",
      start_time: "",
      selected_time: "",
      selected_day: "",
      note: "",
      services: [
        {
          service: "",
          pet: "",
          price: "",
          start_time: "",
          duration: ""
        }
      ],
      products: [
        {
          product: "",
          variant: "",
          quantity: "",
          unit_price: ""
        }
      ],
      submitted: false,
      openCreateOrder: false,
      openUpdateOrder: false,
      openLargePopup: false
    };
  }

  componentDidMount() {
    this.props.getAllOrdersRequest();
    this.props.getAllCompanyModule();
    this.props.getAllClientsRequest();
    this.props.getAllProductsRequest();
    this.props.getAllServiceRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order) {
      this.props.getAllOrdersRequest();
    }
  }

  handleCreateSubmit = data => {
    this.props.createOrderRequest(data);
    this.setState({ openLargePopup: false });
  };

  handleUpdateSubmit = e => {
    e.preventDefault();
    const { customer, start_time, status, services, products } = this.state;
    this.setState({ submitted: true });
    const data = {
      customer: customer,
      start_time: start_time,
      status: status,
      services: services,
      products: products
    };
    if (customer && start_time && status && services && products) {
      this.props.updateOrderRequest(data, this.state.id);
      this.setState({ openUpdateOrder: false });
    }
  };

  handleChange = obj => {
    this.setState(obj);
  };

  ConvertTimeformat = (format, str) => {
    var time = str;
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "pm" && hours < 12) hours = hours + 12;
    if (AMPM == "am" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return sHours + ":" + sMinutes;
  };

  onOpenLargePopup = obj => {
    if (obj !== undefined) {
      let t = moment(obj.start).format();
      let x = t.split("T");
      let pickedDate = moment(obj.start).format("dddd, MMMM Do YYYY");
      let _global = this;
      let cleanTime = function() {
        let x = _global
          .ConvertTimeformat("24", moment(obj.start).format("h:mm a"))
          .split(":");
        let hr = parseInt(x[0]);
        let min = x[1];
        return `${hr}:${min}`;
      };
      this.setState({
        ...this.state,
        picked_date: pickedDate,
        selected_day: x[0],
        selected_time: cleanTime()
      });
    } else {
      let selectedTime = moment().format("dddd, MMMM Do YYYY");
      let t = moment().format();
      let x = t.split("T");
      this.setState({
        ...this.state,
        picked_date: selectedTime,
        selected_day: x[0]
        // selected_time: new Date()
      });
    }

    this.setState({ openLargePopup: true });
  };

  onCloseLargePopup = () => {
    this.setState({ openLargePopup: false });
  };

  onOpenCreateModal = () => {
    this.setState({ openCreateOrder: true });
  };

  onCloseCreateModal = () => {
    this.setState({ openCreateOrder: false });
  };

  onOpenUpdateModal = () => {
    this.setState({ openUpdateOrder: true });
  };

  onCloseUpdateModal = () => {
    this.setState({ openUpdateOrder: false });
  };

  render() {
    if (this.props.orders !== undefined && this.props.companies) {
      let currentYear = () => new Date().getFullYear();
      let currentMonth = () => new Date().getMonth();
      let currentDay = () => new Date().getDay();
      let openingTime = () => {
        let x = this.props.companies.opening_time.split(":");
        return parseInt(x[0], 10);
      };
      let closingTime = () => {
        let x = this.props.companies.closing_time.split(":");
        return parseInt(x[0], 10);
      };

      var convert = function(date) {
        let seperateDayAndTime = date.split("T");
        let seperatedDay = seperateDayAndTime[0].split("-");
        let seperatedTime = seperateDayAndTime[1].split("+")[0].split(":");

        return new Date(
          parseInt(seperatedDay[0]),
          parseInt(seperatedDay[1]) - 1,
          parseInt(seperatedDay[2]),
          parseInt(seperatedTime[0]),
          parseInt(seperatedTime[1]),
          parseInt(seperatedTime[2])
        );
      };

      let event = this.props.orders.map(x => ({
        id: x.id,
        title: x.note,
        start: convert(x.start_time),
        end: convert(x.end_time)
      }));
      return (
        <React.Fragment>
          {this.props.loading === true ? <SpinerWrap /> : null}

          <CreateOrderModal
            modalState={this.state}
            onCloseModal={this.onCloseCreateModal}
            handleChange={this.handleChange}
            handleSubmit={this.handleCreateSubmit}
            loading={this.props.loading}
            title={"Create Order"}
          />
          <UpdateOrderModal
            modalState={this.state}
            onCloseModal={this.onCloseUpdateModal}
            handleChange={this.handleChange}
            handleSubmit={this.handleUpdateSubmit}
            loading={this.props.loading}
            title={"Update Order"}
          />
          <LargePopup
            modalState={this.state}
            close={this.onCloseLargePopup}
            clients={this.props.clients && this.props.clients}
            product={this.props.products && this.props.products}
            service={this.props.services && this.props.services}
            handleAppointmentChange={this.handleChange}
            handleAppointmentSubmit={this.handleCreateSubmit}
            title="Appointment"
          />

          <ButtonWrap>
            <button onClick={() => this.onOpenLargePopup()}>
              <i className="material-icons"> add </i>
            </button>
          </ButtonWrap>

          <BigCalendar
            style={{ minHeight: "70rem" }}
            localizer={localizer}
            events={event}
            selectable
            views={["week", "day"]}
            defaultView="week"
            step={30}
            timeslots={1}
            min={
              new Date(
                currentYear(),
                currentMonth(),
                currentDay(),
                openingTime()
              )
            }
            max={
              new Date(
                currentYear(),
                currentMonth(),
                currentDay(),
                closingTime()
              )
            }
            defaultDate={new Date()}
            onSelectEvent={event => console.log(event)}
            onSelectSlot={x => this.onOpenLargePopup(x)}
          />
        </React.Fragment>
      );
    } else {
      return <SpinerWrap />;
    }
  }
}

const mapStateToProps = state => ({
  companies: state.company.companies,
  orders: state.orderReducer.orders,
  order: state.orderReducer.order,
  services: state.serviceReducer.services,
  products: state.productReducer.products,
  clients: state.clientReducer.clients,
  loading: state.orderReducer.loading
});

export default connect(
  mapStateToProps,
  {
    getAllOrdersRequest,
    createOrderRequest,
    updateOrderRequest,
    deleteOrderRequest,
    getAllCompanyModule,
    getAllClientsRequest,
    getClientsByIdRequest,
    getAllServiceRequest,
    getAllProductsRequest
  }
)(ScheduleCalender);
