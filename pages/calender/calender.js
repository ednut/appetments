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
import {
  getAllServiceRequest,
  getServiceByIdRequest
} from "../../modules/serviceModule";
import { getAllProductsRequest } from "../../modules/productModule";
import styled from "styled-components";
import { height } from "../../components/styles/constant";
import { convertTimeformat, convert, formatDate } from "../../utils/helpers";
import SpinerWrap from "../../components/Spinner";
import LargePopup from "./LargePopup";
import EditPopup from "./EditPopup";
import CheckoutPopup from "./CheckoutPopup";

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
    background-color: #17977c;
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
      checkout: {},
      edit: {},
      submitted: false,
      openLargePopup: false,
      openEditPopup: false,
      openCheckoutPopup: false
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

  updateDate = date => {
    this.setState({ picked_date: date });
  };

  handleCreateSubmit = data => {
    this.props.createOrderRequest(data);
    this.setState({ openLargePopup: false });
  };

  handleUpdateSubmit = (data, id) => {
    this.props.updateOrderRequest(data, id);
    this.setState({ openEditLargePopup: false });
  };

  handleChange = obj => {
    this.setState(obj);
  };

  getService = id => {
    this.props.getServiceByIdRequest(id);
  };

  onOpenLargePopup = obj => {
    if (obj !== undefined) {
      let t = moment(obj.start).format();
      let x = t.split("T");
      let pickedDate = obj.start;
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
      let selectedTime = new Date();
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

  onOpenCheckoutPopup = obj => {
    this.setState({ checkout: obj, openCheckoutPopup: true });
  };

  onCloseCheckoutPopup = () => {
    this.setState({ openCheckoutPopup: false });
  };

  onCloseLargePopup = () => {
    this.setState({ openLargePopup: false });
  };

  onCloseEditPopup = () => {
    this.setState({ openEditPopup: false });
  };

  onEditAppointment = obj => {
    console.log(obj);
    this.setState({ edit: obj, openEditPopup: true, openCheckoutPopup: false });
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
        end: convert(x.end_time),
        company: x.company,
        products: x.products,
        services: x.services,
        customer: x.customer,
        start_time: x.start_time,
        end_time: x.end_time,
        total_duration: x.total_duration,
        total_price: x.total_price,
        status: x.status,
        note: x.note,
        payment_status: x.payment_status,
        payment_reference: x.payment_reference
      }));

      let todayDate = new Date();
      let currentDate = formatDate(todayDate);
      console.log(currentDate);

      return (
        <React.Fragment>
          {this.props.loading === true ? <SpinerWrap /> : null}
          <LargePopup
            modalState={this.state}
            close={this.onCloseLargePopup}
            clients={this.props.clients && this.props.clients}
            product={this.props.products && this.props.products}
            service={this.props.services && this.props.services}
            selectedService={this.props.service && this.props.service}
            updateDate={this.updateDate}
            getService={this.getService}
            handleAppointmentChange={this.handleChange}
            handleAppointmentSubmit={this.handleCreateSubmit}
            title="Appointment"
          />

          <CheckoutPopup
            modalState={this.state}
            close={this.onCloseCheckoutPopup}
            clients={this.props.clients && this.props.clients}
            company={this.props.companies && this.props.companies}
            edit={this.onEditAppointment}
            title="View Appointment"
          />

          <EditPopup
            modalState={this.state}
            close={this.onCloseEditPopup}
            clients={this.props.clients && this.props.clients}
            product={this.props.products && this.props.products}
            service={this.props.services && this.props.services}
            selectedService={this.props.service && this.props.service}
            getService={this.getService}
            handleAppointmentChange={this.handleChange}
            handleAppointmentSubmit={this.handleUpdateSubmit}
            title="Edit Appointment"
          />

          <ButtonWrap>
            <button onClick={() => this.onOpenLargePopup()}>
              <i className="material-icons"> add </i>
            </button>
          </ButtonWrap>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "300",
              paddingLeft: "5rem",
              paddingRight: "5rem"
            }}
          >
            {currentDate}
          </h1>
          <BigCalendar
            style={{
              minHeight: "70rem",
              marginTop: "0rem",
              marginLeft: "5rem",
              marginRight: "5rem"
            }}
            localizer={localizer}
            events={event}
            selectable
            views={["week", "day"]}
            defaultView="week"
            step={30}
            timeslots={2}
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
            onSelectEvent={event => this.onOpenCheckoutPopup(event)}
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
  service: state.serviceReducer.individual_service,
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
    getAllProductsRequest,
    getServiceByIdRequest
  }
)(ScheduleCalender);
