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
import { height } from "../../components/styles/constant";
import { convertTimeformat, convert } from "../../utils/helpers";
import SpinerWrap from "../../components/Spinner";
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
      openLargePopup: false,
      openEditLargePopup: false
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
    this.props.updateOrderRequest(data, this.state.id);
    this.setState({ openEditLargePopup: false });
  };

  handleChange = obj => {
    this.setState(obj);
  };

  onOpenLargePopup = obj => {
    if (obj !== undefined) {
      let t = moment(obj.start).format();
      let x = t.split("T");
      let pickedDate = moment(obj.start).format("dddd, MMMM Do YYYY");
      let cleanTime = function() {
        let x = convertTimeformat(
          "24",
          moment(obj.start).format("h:mm a")
        ).split(":");
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

      let event = this.props.orders.map(x => ({
        id: x.id,
        title: x.note,
        start: convert(x.start_time),
        end: convert(x.end_time)
      }));
      return (
        <React.Fragment>
          {this.props.loading === true ? <SpinerWrap /> : null}

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
